<template>
  <div v-if="film" class="">
    <div class="pt-20">
      <div class="flex flex-row justify-center align-center text-left">
        <div class="flex flex-col justify-left align-left">
          <img
              :src="getFilmImage(film.poster)"
              :alt="film.title"
              class="h-[350px] w-full object-cover"
          />
        </div>
        <div class="flex flex-col justify-right align-right ml-5 gap-2">
      <h1 class="text-[var(--jaune)] font-bold">Nom : {{ film.title }}</h1>
      <h1>Genre : {{ formatGenre(film.genres) }}</h1>
      <h1>Durée : {{ formatDuration(film.duration) }}</h1>
        </div>
      </div>
  </div>
  </div>
</template>

<script setup>
import {useFilmsStore} from "@/stores/modules/films.js";
import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";

const filmsStore = useFilmsStore();
const route = useRoute();
const id = route.params.id;

onMounted(async () => {
  if (!filmsStore.films.length) {
    await filmsStore.getFilms();
  }
});

const getFilmImage = (fileName) =>
    new URL(`../assets/img/${fileName}`, import.meta.url).href;


const film = computed(() =>
    filmsStore.films.find(f => f.id === id)
);

const formatDuration = (minutes) => {
  if (!minutes) return "0h 0min";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}min`;
};

const formatGenre = (genres) => {
  if (!genres || !genres.length) return "Aucun genre";
  return genres.join(", ");
  // genres.join crée une liste de tout les éléments separé par la chaine de caractere en param donc ","
};


</script>

<style scoped>
</style>
