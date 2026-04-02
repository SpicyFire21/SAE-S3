<template>
  <div>

    <div class="flex items-center gap-4 mb-8">
      <h2 class="text-gray-900 text-xl font-bold tracking-tight whitespace-nowrap">{{ t("CinemaStandDetails.1") }}</h2>
      <div class="h-px flex-1 bg-gray-100"></div>
      <span class="text-gray-400 text-xs font-semibold tracking-widest uppercase">{{ filmsStore.films.length }} films</span>
    </div>

    <div v-if="filmsStore.films.length" class="flex flex-col gap-3">
      <div v-for="film in filmsStore.films" :key="film.id"
           class="rounded-2xl border border-gray-100 bg-gray-50 p-5 hover:border-gray-200">

        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <h3 class="text-gray-900 font-bold text-base leading-tight mb-1">{{ film.title }}</h3>
            <p class="text-gray-400 text-sm mb-4">{{ t("CinemaStandDetails.2") }} · {{ film.duration }} min</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="projection in standsStore.getProjectionsByStandAndFilm(props.stand.id, film.id)"
                    :key="projection.id"
                    class="inline-flex items-center bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                {{
                  new Date(projection.date).toLocaleString('fr-FR', {
                    weekday: 'short', day: 'numeric', month: 'short',
                    hour: '2-digit', minute: '2-digit'
                  })
                }}
              </span>
            </div>
          </div>

          <button @click="openModal(film)"
                  class="shrink-0 bg-yellow-400 hover:bg-yellow-300 text-gray-900 text-sm font-bold px-5 py-2.5 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                  :disabled="!usersStore.currentUser || usersStore.currentUser.droit === '1'">
            {{ t("CinemaStandDetails.3") }}
          </button>
        </div>

      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div class="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl relative border border-gray-100">

        <button @click="closeModal"
                class="absolute top-5 right-5 text-gray-300 hover:text-gray-600 text-base leading-none">
          ✕
        </button>

        <p class="text-yellow-400 text-xs font-semibold tracking-widest uppercase mb-1">{{ t("CinemaStandDetails.4") }}</p>
        <h2 class="text-gray-900 text-2xl font-black tracking-tight mb-1">{{ selectedFilm.title }}</h2>
        <p class="text-gray-400 text-sm mb-7">{{ t("CinemaStandDetails.5") }}</p>

        <p class="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-3">{{ t("CinemaStandDetails.6") }}</p>

        <div class="flex flex-col gap-2 mb-6 max-h-60 overflow-y-auto">
          <button
              v-for="projection in standsStore.getProjectionsByStandAndFilm(props.stand.id, selectedFilm.id)"
              :key="projection.id"
              @click="filmsStore.setSelectedProjection(projection)"
              :class="[
                'py-3 px-4 rounded-xl border text-left text-sm font-medium',
                filmsStore.selectedProjection && filmsStore.selectedProjection.id === projection.id
                  ? 'bg-yellow-400 text-gray-900 border-yellow-300 font-bold'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-100'
              ]">
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
            class="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3.5 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            :disabled="!filmsStore.selectedProjection || hasAlreadyReservedProjection">
          {{ t("CinemaStandDetails.7") }}
        </button>

        <p v-if="hasAlreadyReservedProjection" class="text-red-400 text-xs text-center mt-3">
          {{ t("CinemaStandDetails.8") }}
        </p>

      </div>
    </div>

    <div v-if="showSuccessPopup"
         class="fixed top-24 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-6 py-3.5 rounded-2xl shadow-xl z-50">
      <span class="text-yellow-400">✓</span>
      {{ t("CinemaStandDetails.9") }}
    </div>

  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
import {useRoute} from 'vue-router'
import {useFilmsStore} from "@/stores/index.js";
import {useUserStore} from "@/stores/index.js";
import {useStandsStore} from "@/stores/modules/stands.js";
import {useReservationsStore} from "@/stores/modules/reservations.js"
import {useI18n} from "vue-i18n";
const { t } = useI18n()
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

const filmsStore = useFilmsStore();
const usersStore = useUserStore();
const standsStore = useStandsStore();
const reservationsStore = useReservationsStore();

onMounted(async () => {
  await filmsStore.getProjections();
  await filmsStore.getFilmsByStand(props.stand.id);
  await usersStore.getUsers();
  await standsStore.getStands();
  await reservationsStore.getReservations();
  await reservationsStore.getFilmsReservations();
})

const hasAlreadyReservedProjection = computed(() => {
  if (!filmsStore.selectedProjection || !usersStore.currentUser || !reservationsStore.filmsReservations) return false;
  return reservationsStore.reservations.some(r =>
      r.user_id === usersStore.currentUser.id &&
      r.type === "film" &&
      reservationsStore.filmsReservations.some(fr =>
          fr.reservation_id === r.id &&
          fr.projection_id === filmsStore.selectedProjection.id
      )
  );
});

const confirmFilmReservation = async () => {
  await reservationsStore.addFilmReservation({
    userId: usersStore.currentUser.id,
    type: "film",
    date: filmsStore.selectedProjection.date,
    standId: props.stand.id,
    projectionId: filmsStore.selectedProjection.id,
  });
  closeModal();
  showSuccessPopup.value = true;
  setTimeout(() => { showSuccessPopup.value = false; }, 2250);
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