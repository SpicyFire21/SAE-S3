<template>
  <div class="pl-68 w-full">
    <SimpleChart
        type="pie"
        :labels="usersByRole.labels"
        :values="usersByRole.values"
    />
    <hr>
    <SimpleChart
        type="pie"
        :labels="reservationsByType.labels"
        :values="reservationsByType.values"
    />
    <hr>
    <SimpleChart
        type="bar"
        :labels="filmsPerGenre.map(g => g.label)"
        :values="filmsPerGenre.map(g => g.count)"
        label="Films par genre"
    />

  </div>


</template>

<script setup>

import SimpleChart from "@/components/utils/SimpleChart.vue";
import {useFilmsStore, useGoodiesStore, useReservationsStore, useTicketsStore, useUserStore} from "@/stores/index.js";
import {onMounted} from "vue";
const userStore = useUserStore();
const goodieStore = useGoodiesStore();
const reservationStore = useReservationsStore();
const filmStore = useFilmsStore();

const usersByRole = {
  labels: ["Client", "Prestataire", "Admin"],
  values: [
    userStore.users.filter(u => u.droit === "0").length,
    userStore.users.filter(u => u.droit === "1").length,
    userStore.users.filter(u => u.droit === "2").length
  ]
}

const reservationsByType = {
  labels: ["Cinéma", "Dédicace"],
  values: [
    reservationStore.reservations.filter(r => r.type === "1").length,
    reservationStore.reservations.filter(r => r.type === "2").length
  ]
}


const filmsPerGenre = filmStore.genres.map(g => ({
  label: g.name,
  count: filmStore.filmGenres.filter(fg => fg.genreId === g.id).length
})).filter(g => g.count > 0)


 onMounted(async()=>{
   await userStore.getUsers();
   await goodieStore.getGoodies();
   await reservationStore.getReservations()
   await filmStore.getFilms();
   await filmStore.getGenres();
   await filmStore.getFilmGenres()
  console.log(filmStore.filmGenres)
   console.log(filmStore.genres)

 })

</script>
