<template>
  <div class="">
    <div v-for="category in categories" :key="category" class="pt-10">
      <FilmCarousel
          :get-director-name="getDirectorName"
          :category="category"
          :films="filmsStore.films"
      />
      <br>
      <br>
    </div>
  </div>
</template>

<script setup>
import FilmCarousel from "@/components/FilmCarousel.vue";
import { onMounted, computed } from "vue";
import { useFilmsStore } from "@/stores/modules/films.js";
import { useUserStore } from "@/stores/index.js";
import { useTicketsStore } from "@/stores/modules/tickets.js";

const filmsStore = useFilmsStore()
const userStore = useUserStore()
const ticketsStore = useTicketsStore()

const getDirectorName = (director_id) => {
  const director = userStore.providers.find(user => user.id === director_id)
  return director ? director.name : 'Directeur inconnu'
}

onMounted(async () => {
  await filmsStore.getFilms();
  await userStore.getProviders();
  await ticketsStore.getTickets();
});

const categories = computed(() => {
  const allGenres = filmsStore.films.reduce((acc, film) => {
    return acc.concat(film.genres) // concatène tous les genres dans un seul tableau
  }, [])
  return [...new Set(allGenres)]  // supprime les doublons
})

</script>
