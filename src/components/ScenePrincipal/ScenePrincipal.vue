<template>
  <div class="scene-principale">
    <h1>La Cérémonie des Pablos</h1>
    <div class="films-list">
      <FilmCard
          v-for="film in films"
          :key="film.id"
          :film="film"
          @vote="openVoteModal"
      />
    </div>

    <VoteModal
        v-if="modalFilm"
        :film="modalFilm"
        :categories="categories"
        @close="modalFilm = null"
        @submitVote="submitVote"
    />

    <Classement />

    <AdminPanel v-if="isAdmin"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFilmsStore } from "@/stores/modules/films.js"
import { useVotesStore } from "@/stores/modules/votes.js"

import FilmCard from "@/components/ScenePrincipal/FilmCard.vue"
import VoteModal from "@/components/ScenePrincipal/VoteModal.vue"
import Classement from "@/components/ScenePrincipal/Classement.vue"
import AdminPanel from "@/components/ScenePrincipal/AdminPanel.vue"

const filmsStore = useFilmsStore()
const votesStore = useVotesStore()

const modalFilm = ref(null)
const isAdmin = ref(false) // à remplacer par votre logique auth

const openVoteModal = (film) => modalFilm.value = film
const submitVote = (vote) => {
  votesStore.addVote(vote)
  modalFilm.value = null
}

onMounted(async () => {
  await filmsStore.getFilms()
  await votesStore.getVotes()
})
</script>

<style scoped>
.scene-principale { padding: 20px; }
.films-list { display: flex; flex-wrap: wrap; gap: 10px; }
</style>
