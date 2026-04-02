<template>
  <div
      ref="mapContainer"
      class="relative overflow-hidden border border-gray-200 shadow-lg rounded-2xl w-full h-[600px] mt-10 bg-white"
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
            :class="['interactive', getStandStyle(stand.type_id)]"
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
            :font-size="getFontSize(stand.height, stand.type_id)"
        >
        </text>
      </template>
    </svg>

    <div class="absolute bottom-4 left-4 flex flex-col gap-2 bg-white/90 border border-gray-100 rounded-xl px-4 py-3 shadow-md">
      <p class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Légende</p>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-sm flex-shrink-0" style="background:#c0392b;"></span>
        <span class="text-xs text-gray-700 font-medium">Cinéma</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-sm flex-shrink-0" style="background:#3ab0e7;"></span>
        <span class="text-xs text-gray-700 font-medium">Dédicaces</span>
      </div>
    </div>

    <div
        v-if="popup.visible"
        class="fixed bg-gray-950/95 p-5 rounded-2xl shadow-2xl border border-white/10 max-w-xs w-64 z-50 pointer-events-auto"
        :style="{ top: popup.y + 'px', left: popup.x + 'px' }"
    >
      <h3 class="text-yellow-400 font-bold text-base mb-1">{{ popup.stand?.name }}</h3>
      <p class="text-gray-400 text-xs mb-0.5">{{ popup.standType?.type }}</p>
      <p class="text-gray-400 text-xs mb-4">{{ t('InteractiveMap.1') }}: <span class="text-white">{{ popup.owner?.name || t('InteractiveMap.2') }}</span></p>
      <div class="flex flex-wrap gap-2">
        <button
            class="bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full"
            @click="hidePopup"
        >
          {{ t('InteractiveMap.3') }}
        </button>
        <button
            class="bg-yellow-400 hover:bg-yellow-300 text-gray-950 text-xs font-bold px-3 py-1.5 rounded-full"
            @click="goToStand(popup.stand.id)"
        >
          <span v-if="userStore.currentUser?.droit !== 1">{{ t('InteractiveMap.4') }}</span>
          <span v-else>Consulter ce stand</span>
        </button>
        <button
            class="bg-blue-500 hover:bg-blue-400 text-white text-xs font-medium px-3 py-1.5 rounded-full"
            @click="providerReservationRequest(popup.stand.id)"
            v-if="userStore.currentUser?.droit === '1' && popup.stand.owner_id == null && !hasAlreadyDoneAStandRequest(popup.stand)"
        >
          {{ t('InteractiveMap.5') }}
        </button>
      </div>
    </div>
  </div>

  <div v-if="isModalOpen" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-3xl p-8 w-96 shadow-2xl relative border border-gray-100">

      <button @click="closeModal" class="absolute top-5 right-5 text-gray-300 hover:text-gray-600 text-base leading-none">
        ✕
      </button>

      <p class="text-yellow-400 text-xs font-semibold tracking-widest uppercase mb-1">{{ t('InteractiveMap.6') }}</p>
      <h2 class="text-gray-900 text-xl font-black mb-1">{{ standsStore.selectedStand.name }}</h2>
      <p class="text-gray-400 text-sm mb-7">{{ t('InteractiveMap.7') }}</p>

      <div class="flex gap-3">
        <button
            class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-3 rounded-2xl text-sm"
            @click="closeModal"
        >
          {{ t('InteractiveMap.8') }}
        </button>
        <button
            class="flex-1 bg-yellow-400 hover:bg-yellow-300 text-gray-950 font-bold px-4 py-3 rounded-2xl text-sm"
            @click="confirmReservation"
        >
          {{ t('InteractiveMap.9') }}
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
import {useI18n} from "vue-i18n";

const {t} = useI18n();
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
    status: "pending",
    idstand: standsStore.selectedStand.id,
    iduser: userStore.currentUser.id,
  });
  await standsStore.getStandsReservationsRequests()
  closeModal();
}

const hasAlreadyDoneAStandRequest = (stand) => {
  if (!stand || !userStore.currentUser || !standsStore.standReservationsRequests) return false
  return standsStore.standReservationsRequests.some(
      request =>
          request.stand_id === stand.id &&
          request.user_id === userStore.currentUser.id &&
          request.status === "pending"
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
  popup.x = event.clientX;
  popup.y = event.clientY;
  popup.visible = true;
  popup.standType = await standsStore.getStandTypeById(stand.type_id)
  popup.owner = await userStore.getUserById(stand.owner_id);
};

const goToStand = (id) => {
  const selectedStand = standsStore.stands.find(stand => stand.id === id)
  standsStore.setSelectedStand(selectedStand)
  router.push({name: 'StandDetails', params: {id}})
}

const providerReservationRequest = (standId) => {
  const selectedStand = standsStore.stands.find(stand => stand.id === standId);
  standsStore.setSelectedStand(selectedStand);
  openModal();
}

const getFontSize = (h, type) => {
  switch (type) {
    case '1':
      return h * 0.18;
    case '2':
      return h * 0.55;
    case 'standXL':
      return h * 0.30;
    case 'stand':
      return h * 0.38;
    default:
      return h * 0.28;
  }
}

const getStandStyle = (type) => {
  switch (type) {
    case 1: return "cinema";
    case 'scene': return "scene";
    case 2: return "standXL";
    case 'stand': return "stand";
    default: return "";
  }
}

</script>

<style scoped>
.label {
  fill: white;
  text-anchor: middle;
  dominant-baseline: middle;
  pointer-events: none;
  user-select: none;
  font-weight: 700;
}

.non-interactive {
  fill: #f0f0f0;
  stroke: #d4d4d4;
  stroke-width: 2;
}

.interactive {
  stroke-width: 0;
  cursor: pointer;
}

.interactive:hover {
  opacity: 0.75;
}

.cinema { fill: #c0392b; }
.standXL { fill: #3ab0e7; }
.stand { fill: #2ecc71; }
.scene { fill: #f5a6c5; }
</style>