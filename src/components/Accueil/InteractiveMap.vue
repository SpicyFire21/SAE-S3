<template>
  <div
      ref="mapContainer"
      class="relative overflow-hidden border shadow-md rounded-lg w-full h-[600px] mt-10 bg-white"
  >
    <svg
        ref="svgMap"
        viewBox="0 0 2048 1952"
        class="w-full h-full"
    >
      <rect class="non-interactive" id="hall1" x="1226" y="25" width="797" height="931" />
      <rect class="non-interactive" id="hall2" x="1226" y="989" width="797" height="931" />

      <template v-for="stand in standsStore.stands" :key="stand.id">
        <rect
            :class="['interactive', getStandStyle(stand.type)]"
            :x="stand.x"
            :y="stand.y"
            :width="stand.width"
            :height="stand.height"
            @click="(event) => showPopup(event, stand)"
        ></rect>
        <text
            class="label"
            :x="stand.x + stand.width / 2"
            :y="stand.y + stand.height / 2"
            :font-size="getFontSize(stand.height, stand.type)"
        >
          {{ stand.name }}
        </text>
      </template>
    </svg>

    <!-- popup tranquillou -->
    <div
        v-if="popup.visible"
        class="fixed bg-[var(--noir)]/90 p-4 rounded-lg shadow-xl max-w-xs w-64 z-50 pointer-events-auto transform transition duration-200"
        :style="{ top: popup.y + 'px', left: popup.x + 'px' }"
    >
      <h3 class="text-[var(--jaune)] mb-2">{{ popup.stand?.name }}</h3>
      <p class="text-white mb-1">Type: {{ popup.standType?.type }}</p>
      <p class="text-white mb-2">Propriétaire: {{ popup.owner?.name || 'Aucun propriétaire' }}</p>
      <div class="gap-3">
        <button
            class="bg-[var(--jaune)] hover:bg-[var(--jaune)]/70 text-white text-sm px-3 py-1 rounded"
            @click="hidePopup"
        >
          Fermer
        </button>

        <button
            class="bg-[var(--jaune)] hover:bg-[var(--jaune)]/70 text-white text-sm px-3 py-1 rounded ml-4"
            @click="goToStand(popup.stand.idstand)"
        >
          <span v-if="userStore.currentUser?.droit !== '1'">Réserver sa place</span>
          <span v-else>Consulter ce stand</span>
        </button>
        <button
            class="bg-[var(--bleu)] hover:bg-[var(--bleu)]/70 text-white text-sm px-3 py-1 rounded mr-3 mt-3 mb-3"
            @click="providerReservationRequest(popup.stand.idstand)"
            v-if="userStore.currentUser?.droit === '1' && popup.stand.owner === null && !hasAlreadyDoneAStandRequest(popup.stand)"
        >
          Demande de réservation du stand
        </button>
      </div>
    </div>
  </div>

  <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-96 shadow-lg relative">

      <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
        ✕
      </button>

      <h2 class="text-xl font-bold mb-4">Réserver le stand</h2>
      <p class="mb-4">
        Vous êtes sur le point de réserver :
        <strong>{{ standsStore.selectedStand.name }}</strong>
      </p>

      <div class="flex justify-center gap-3">
        <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-xl"
            @click="closeModal"
        >
          Annuler
        </button>
        <button
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl"
            @click="confirmReservation"
        >
          Confirmer
        </button>
      </div>

    </div>
  </div>

</template>



<script setup>
import panzoom from "panzoom";
import {useStandsStore} from "@/stores/modules/stands.js";
import {computed, onMounted, reactive, ref} from "vue";
import {useUserStore} from "@/stores/index.js";
import router from "@/router/index.js";


const standsStore = useStandsStore()
const userStore = useUserStore()

onMounted(async () => {
  await standsStore.getStandsReservationsRequests()
  await standsStore.getStands();
  await userStore.getUsers();
  await standsStore.getStandsTypes();


  if (svgMap.value) {
    panzoom(svgMap.value, {
      smoothScroll: false,
      zoomSpeed: 0.065,
      maxZoom: 3,
      minZoom: 0.5,
    });
  }
});
const svgMap = ref(null);
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
}

const closeModal = () => {
  isModalOpen.value = false;
  standsStore.setSelectedStand(null)
}

const confirmReservation = async () => {
  await standsStore.addStandRequest({
    standId: standsStore.selectedStand.idstand,
    userId: userStore.currentUser.id,
    status: "pending",
  });
  closeModal();
}

const hasAlreadyDoneAStandRequest = (stand) => {
  if (!stand || !userStore.currentUser) return false

  return standsStore.standReservationsRequests.some(
      request =>
          request.standId === stand.idstand &&
          request.userId === userStore.currentUser.id &&
          request.status === "pending" // comme lorsqu'un admin refuse cela ne supprime pas la demande mais la met en refused,
      // on va filtrer uniquement sur les demandes en pending sinon meme lorsque la demande se fait refuser, on ne pourra plus jamais
      // demander pour ce stand
  )
}




const popup = reactive({
  visible: false,
  x: 0,
  y: 0,
  stand: null,
  standType: null,
  owner: null
});

const hidePopup = () => {
  popup.visible = false;
};


const showPopup = async (event, stand) => {
  popup.stand = stand;
  popup.x = event.clientX; // position souris
  popup.y = event.clientY;
  popup.visible = true;
  popup.standType = await standsStore.getStandTypeById(stand.type)
  popup.owner = await userStore.getUserById(stand.owner);
};


const goToStand = (id) => {
  const selectedStand = standsStore.stands.find(stand => stand.idstand === id)
  standsStore.setSelectedStand(selectedStand)
  router.push({name: 'StandDetails', params: {id}})
}

const providerReservationRequest = (id) => {
  const selectedStand = standsStore.stands.find(stand => stand.idstand === id);
  standsStore.setSelectedStand(selectedStand);
  openModal();
}

const getFontSize = (h, type) => {
  switch (type) {

    case 'cinema':
      return h * 0.12; // Gros texte

    case 'scene':
      return h * 0.40; // Très visible

    case 'standXL':
      return h * 0.22; // ex-grand stand

    case 'stand':
      return h * 0.28; // petits stands

    default:
      return h * 0.20;
  }
}

const getStandStyle = (type) => {
  switch (type) {
    case '1': return "cinema";
    case 'scene': return "scene";
    case '2': return "standXL";
    case 'stand': return "stand";
    default: return "";
  }
}

</script>


<style scoped>
.label {
  fill: black;
  text-anchor: middle;
  dominant-baseline: middle;
  pointer-events: none;
  user-select: none;
  font-weight: 700;
}

/* Non-interactifs */
.non-interactive {
  fill: #e5e5e5;
  stroke: #b3b3b3;
  stroke-width: 2;
}

/* Interactifs */
.interactive {
  stroke: #000000;
  stroke-width: 2;
  cursor: pointer;
  transition: 0.2s;
}

.interactive:hover {
  opacity: 0.50;
  stroke-width: 4;
}


/* Couleurs */
.cinema { fill: #c0392b; }
.standXL { fill: #3ab0e7; }
.stand { fill: #2ecc71; }
.scene { fill: #f5a6c5; }

</style>