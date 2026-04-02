<template>
  <div v-if="film" class="min-h-screen bg-white pt-24 px-6">
    <div class="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center md:items-start">
      <img
          :src="getFilmImage(film.poster)"
          :alt="film.title"
          class="h-[400px] w-[280px] object-cover rounded-3xl shadow-2xl"
      />

      <div class="flex flex-col gap-4 text-center md:text-left">
        <h1 class="text-4xl font-extrabold text-gray-900">
          {{ film.title }}
        </h1>

        <div class="flex flex-wrap gap-3 justify-center md:justify-start">
          <span class="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm font-semibold">
            🎬 {{ formatGenre(genres) }}
          </span>
          <span class="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm font-semibold">
            ⏱ {{ formatDuration(film.duration) }}
          </span>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto mt-20">
      <h2 class="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-2">
        Cinéma(s) diffusant ce film
      </h2>

      <div
          v-if="filmsStore.standsInSelectedFilm.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
            v-for="stand in filmsStore.standsInSelectedFilm"
            :key="stand.id"
            class="bg-white border border-gray-200 rounded-3xl p-6 shadow-md
                 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              {{ stand.name }}
            </h3>

            <p class="text-sm text-gray-800 mb-4">
              Propriétaire - {{ usersStore.getUserById(stand.owner_id).name || 'Aucun type disponible' }}
            </p>
          </div>

          <button
              class="mt-auto px-4 py-2 rounded-xl
                   bg-yellow-400 text-white font-semibold
                   hover:bg-yellow-500
                   transition-all duration-300 shadow-md hover:shadow-lg"
              @click="goToStand(stand.id)"
          >
            Voir le stand
          </button>
        </div>
      </div>

      <div
          v-else
          class="text-center text-gray-400 mt-10 text-lg"
      >
        Aucun stand ne diffuse ce film pour le moment
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFilmsStore } from "@/stores/modules/films.js";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import {useStandsStore, useUserStore} from "@/stores/index.js";
import router from "@/router/index.js";

const { t } = useI18n();
const filmsStore = useFilmsStore();
const standsStore = useStandsStore();
const usersStore = useUserStore();
const route = useRoute();
const id = route.params.id;

onMounted(async () => {
  await usersStore.getUsers();
  await filmsStore.getFilms();
  await standsStore.getStands();
  await filmsStore.getFilmGenres();
  await filmsStore.getGenres();
  await filmsStore.getFilmCast();
  await filmsStore.getStandsByFilmId(id);
});

const getFilmImage = (fileName) =>
    new URL(`../assets/img/${fileName}`, import.meta.url).href;

const film = computed(() =>
    filmsStore.films.find((f) => f.id === id)
);

const genres = computed(() => filmsStore.getGenresOfFilm(id));

const formatDuration = (minutes) => {
  if (!minutes) return "0h 0min";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}min`;
};

const formatGenre = (genres) => {
  if (!genres || !genres.length) return "Aucun genre";
  return genres.join(", ");
};

const goToStand = (id) => {
  const selectedStand = standsStore.stands.find(stand => stand.id === id)
  standsStore.setSelectedStand(selectedStand)
  router.push({name: 'StandDetails', params: {id}})
}
</script>

<style scoped>
</style>