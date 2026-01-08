<template>
  <div class="ml-dashboard p-6">
    <h1 class="text-2xl font-bold mb-6">{{t("AdminFilms.0")}}</h1>

    <div v-if="requests.length === 0" class="italic text-gray-600">
      {{t("AdminFilms.1")}}
    </div>

    <div v-for="req in requests" :key="req.id"
         class="bg-gray-100 p-4 rounded-xl mb-4 shadow flex justify-between items-center">

      <div class="flex flex-col">
        <span class="font-bold">{{ req.title }}</span>
        <span class="text-sm text-gray-600">{{t("AdminFilms.2")}} {{ req.duration }} min</span>
        <span class="text-sm text-gray-600">{{t("AdminFilms.3")}} {{ req.description }}</span>
      </div>

      <div class="flex gap-2">
        <button @click="accept(req)" class="bg-green-500 text-white px-3 py-1 rounded-xl font-bold">
          {{t("AdminFilms.4")}}
        </button>
        <button @click="refuse(req.id)" class="bg-red-500 text-white px-3 py-1 rounded-xl font-bold">
          {{t("AdminFilms.5")}}
        </button>
      </div>
    </div>

    <h2 class="text-xl font-bold mt-10 mb-4">{{t("AdminFilms.6")}}</h2>

    <div v-if="films.length === 0" class="italic text-gray-600">
      {{t("AdminFilms.7")}}
    </div>

    <div v-for="film in films" :key="film.id"
         class="bg-yellow-100 p-4 rounded-xl mb-3 shadow flex justify-between items-center">

      <span class="font-bold">{{ film.title }}</span>

      <button @click="removeFilm(film.id)" class="bg-red-600 text-white px-2 py-1 rounded-xl font-bold">
        {{t("AdminFilms.8")}}
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useFilmsStore, useVotesStore } from "@/stores"
import { useI18n } from "vue-i18n"

const { t, locale } = useI18n()

const filmsStore = useFilmsStore()
const votesStore = useVotesStore()

onMounted(() => {
  filmsStore.getFilmRequests()
  filmsStore.getFilms()
  votesStore.getScores()
  votesStore.getVotes()
})

const requests = computed(() => filmsStore.filmsRequests)
const films = computed(() => filmsStore.films)

// Actions
const accept = async (request) => {
  console.log(filmsStore.filmsRequests)
  const res = await filmsStore.acceptFilmRequest(request)
  if (res.error !== 0) alert(res.data)
}

const refuse = async (id) => {
  const res = await filmsStore.refuseFilmRequest(id)
  if (res.error !== 0) alert(res.data)
}

const removeFilm = async (id) => {
  
  const resS = await votesStore.deleteAllScoresByFilm(id)
  if (resS.error !== 0) alert(resS.data)
  const resF = await filmsStore.deleteAcceptedFilm(id)
  if (resF.error !== 0) alert(resF.data)
  console.log(votesStore.scores)
  console.log(resS)

}

const removeVotesOfFilm = async (filmId) => {
  const res = await votesStore.removeVotesOfFilm(filmId)
  if (res.error === 0) alert("Votes supprimés ✔")
  else alert(res.data)
}

</script>

<style scoped>
.ml-dashboard {
  margin-left: 250px;
}
</style>
