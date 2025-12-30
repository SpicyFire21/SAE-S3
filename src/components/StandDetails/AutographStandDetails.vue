<template>
  <div class="text-center pt-10">
    <img :src="autographImage" alt="cinema" class="m-auto rounded-lg w-150 h-72">
    <h1 class="pt-4 text-2xl font-bold">Liste des dédicaces disponibles à ce stand :</h1>
  </div>

  <div v-if="autographs.length" class="mt-6 max-w-3xl mx-auto flex flex-col gap-4">
    <div
        v-for="autograph in autographs"
        :key="autograph.id"
        class="p-4 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
    >
      <img :src="getUserImage(autograph.userProfilePicture)" alt="Utilisateur"
           class="w-24 h-24 rounded-full mx-auto mb-2">
      <div class="flex items-center justify-between mb-2">
        <span class="font-semibold text-lg text-[var(--jaune)]">
          {{ autograph.userName }}
        </span>
        <button @click="openModal(autograph)"
                class="bg-[var(--jaune)] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full
                disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!userStore.currentUser || userStore.currentUser.droit === '1'">
          Réserver
        </button>
      </div>
      <div class="text-gray-700 text-sm space-y-1">
        <p>
          <span class="font-medium">Début :</span>
          {{ formatDate(autograph.beginDate) }}
        </p>
        <p>
          <span class="font-medium">Fin :</span>
          {{ formatDate(new Date(new Date(autograph.beginDate).getTime() + autograph.duration * 60000)) }}
<!--          date de fin (* 60000 c'est conversion minute en miliseconds)-->
        </p>
      </div>
    </div>
  </div>

  <div v-else class="text-center mt-6 text-gray-500">
    Aucun autographes disponibles pour ce stand.
  </div>

  <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
    <div class="bg-white rounded-lg p-6 w-96 shadow-lg relative">
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">✕</button>
      <h2 class="text-xl font-bold mb-4">Réserver une dédicace</h2>
      <p class="mb-4">Vous êtes sur le point de réserver une dédicace pour : <strong>{{ autographStore.selectedAutograph.userName }}</strong></p>
      <div class="flex flex-col gap-2 max-h-60 overflow-y-auto items-center">
      <span class="inline-block py-2 px-4 rounded border bg-gray-100 border-gray-300 text-center">
        Le {{ formatDate(autographStore.selectedAutograph.beginDate) }}<br>ce prestataire y sera présent pendant {{ formatDuration(autographStore.selectedAutograph.duration) }}
      </span>
      </div>
      <button class="bg-[var(--jaune)] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full w-full mt-4"
      @click="confirmAutographReservation">
        Confirmer la réservation
      </button>
    </div>
  </div>

  <div v-if="showSuccessPopup"
       class="fixed top-1/10 left-1/2 -translate-x-1/2
            bg-green-500 text-white px-6 py-4 rounded-xl shadow-xl
            z-50 text-center">
    🎉 Réservation confirmée !
  </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAutographsStore } from '@/stores/modules/autographs.js'
import {useReservationsStore, useStandsStore, useUserStore} from '@/stores/index.js'

const autographImage = new URL('@/assets/img/dedicace.png', import.meta.url).href
const autographStore = useAutographsStore()
const userStore = useUserStore()
const reservationStore = useReservationsStore();
const standStore = useStandsStore();

const props = defineProps({ stand: { type: Object, required: true } })

const isModalOpen = ref(false)
const showSuccessPopup = ref(false);


const openModal = (autograph) => {
  autographStore.selectedAutograph = autograph; isModalOpen.value = true
}
const closeModal = () => {
  autographStore.selectedAutograph = null; isModalOpen.value = false
}

onMounted(async () => {
  await autographStore.getAutographsByStandId(props.stand.idstand)
  await standStore.getStands();
  await userStore.getUsers()
  await reservationStore.getReservations();
  await reservationStore.getAutographsReservations()
})

const autographs = computed(() =>
    autographStore.autographs.map(a => {
      const user = userStore.getUserById(a.userId)
      return {
        ...a,
        userName: user?.name || 'Utilisateur inconnu',
        userProfilePicture: user?.nom_photo || 'default.png'
      }
    })
)

const confirmAutographReservation = async () => {
  await reservationStore.addAutographReservation({
    userId: userStore.currentUser.id,
    type: props.stand.type,
    date: autographStore.selectedAutograph.beginDate,
    autographId: autographStore.selectedAutograph.id,
    standId: props.stand.idstand
  });

  console.log("test:" + JSON.stringify(reservationStore.reservations))

  closeModal();

  showSuccessPopup.value = true;

  setTimeout(() => {
    showSuccessPopup.value = false;
  }, 2250);
}

const getUserImage = (fileName) => {
  try { return new URL(`../../assets/img/${fileName}`, import.meta.url).href }
  catch { return new URL('../../assets/img/default.png', import.meta.url).href }
}

const formatDate = (date) =>
    new Date(date).toLocaleString('fr-FR', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })

const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h > 0 ? h + 'h ' : ''}${m}min`
}

</script>
