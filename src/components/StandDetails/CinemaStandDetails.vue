<template>
  <div class="text-center pt-10">
    <img :src="cinemaImage" alt="cinema" width="580" height="580" class="m-auto rounded-lg shadow-lg">
    <h1 class="pt-4 text-[25px] font-bold">Liste des films disponibles à ce stand :</h1>
  </div>
  <div v-if="filmsStore.films.length" class="mt-6 flex flex-col gap-4 max-w-3xl mx-auto">
    <div v-for="film in filmsStore.films" :key="film.id"
         class="items-center p-4 border rounded-lg shadow hover:shadow-lg transition">
      <div class="text-left">
        <h2 class="text-lg font-semibold">{{ film.title }}</h2>
        <p class="text-gray-500">Durée: {{ film.duration }} min</p>
      </div>
      <div class="mt-2">
      <span v-for="projection in standsStore.getProjectionsByStandAndFilm(props.stand.idstand, film.id)" :key="projection.id"
            class="bg-black text-white text-sm px-2 text-center py-3 rounded-full shadow-sm mr-2">
      {{
          new Date(projection.date).toLocaleString('fr-FR', {
            weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
          })
        }}
    </span>
      <button @click="openModal(film)"
              class="bg-[var(--jaune)] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded
              disabled:opacity-50 disabled:cursor-not-allowed ml-5 rounded-full"
              :disabled="!usersStore.currentUser">
        Réserver
      </button>
      </div>
    </div>
  </div>

  <div v-if="isModalOpen"
       class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
    <div class="bg-white rounded-lg p-6 w-96 shadow-lg relative">

      <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
        ✕
      </button>

      <h2 class="text-xl font-bold mb-4">Réserver le film</h2>
      <p class="mb-4">Vous êtes sur le point de réserver : <strong>{{ selectedFilm.title }}</strong></p>

      <h3 class="font-semibold mb-2">Choisissez une séance :</h3>
      <div class="flex flex-col gap-2 mb-4 max-h-60 overflow-y-auto">
        <button
            v-for="projection in standsStore.getProjectionsByStandAndFilm(props.stand.idstand, selectedFilm.id)"
            :key="projection.id"
            @click="filmsStore.setSelectedProjection(projection)"
            :class="[
          'py-2 px-3 rounded border text-left',
          filmsStore.selectedProjection && filmsStore.selectedProjection.id === projection.id
            ? 'bg-[var(--jaune)] text-black border-yellow-400'
            : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
        ]"
        >
          {{
            new Date(projection.date).toLocaleString('fr-FR', {
              weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })
          }}
        </button>
      </div>

      <button
          @click="confirmFilmReservation"
          class="bg-[var(--jaune)] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-full w-full"
          :disabled="!filmsStore.selectedProjection"
      >
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
import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {useFilmsStore} from "@/stores/index.js";
import {useUserStore} from "@/stores/index.js";
import {useStandsStore} from "@/stores/modules/stands.js";
import {useReservationsStore} from "@/stores/modules/reservations.js"

const isModalOpen = ref(false);
const selectedFilm = ref(null);
const showSuccessPopup = ref(false);


const openModal = (film) => {
  selectedFilm.value = film;
  filmsStore.setSelectedProjection(null);
  isModalOpen.value = true;
}

const closeModal = () => {
  isModalOpen.value = false;
  selectedFilm.value = null;
  filmsStore.setSelectedProjection(null);
}

const route = useRoute()

const cinemaImage = new URL('@/assets/img/cinema.jpg', import.meta.url).href
const filmsStore = useFilmsStore();
const usersStore = useUserStore();
const standsStore = useStandsStore();
const reservationsStore = useReservationsStore();

onMounted(async () => {
  await filmsStore.getFilmsByStand(props.stand.idstand);
  await usersStore.getUsers();
  await standsStore.getStands();
  await filmsStore.getProjections();
  await reservationsStore.getReservations();
  await reservationsStore.getFilmsReservations();
})


const confirmFilmReservation = async () => {
  await reservationsStore.addFilmReservation({
    userId: usersStore.currentUser.id,
    type: "film",
    date: filmsStore.selectedProjection.date,
    projectionId: filmsStore.selectedProjection.id,
    standId: props.stand.idstand
  });

  closeModal();

  showSuccessPopup.value = true;

  setTimeout(() => {
    showSuccessPopup.value = false;
  }, 2250);
}


const props = defineProps({
  stand: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
</style>
