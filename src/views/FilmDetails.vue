<template>
  <div v-if="film" class="">
    <div class="pt-20">
    <h1>Nom : {{ film.title }}</h1>
      <h1>Genre : {{ film.genres }}</h1>
      <h1>Durée : {{ film.duration }}</h1>
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


const film = computed(() =>
    filmsStore.films.find(f => f.id === id)
);

console.log("film : ", film.value);
</script>

<style scoped>
</style>
