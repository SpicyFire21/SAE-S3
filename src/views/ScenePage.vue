<template>
  <div class="min-h-screen bg-[var(--blanc)] p-25">
    <h1 class="text-3xl font-bold text-center mb-10 tracking-widest">
      Scène principale — Cérémonie des Pablos
    </h1>

    <!-- Liste des films -->
    <section class="max-w-screen-xl mx-auto grid md:grid-cols-3 gap-6">
      <div
          v-for="film in filmsStore.films"
          :key="film.id"
          class="bg-[var(--gris)] rounded-2xl shadow-lg p-5 flex flex-col gap-3"
      >
        <img
            :src="`/images/${film.poster}`"
            :alt="film.title"
            class="rounded-xl w-full h-80 object-cover shadow-md"
        />

        <h2 class="text-xl font-semibold text-center tracking-wide">
          {{ film.title }}
        </h2>

        <p class="text-sm text-center text-[var(--grisf)]">
          🎭 Genres : {{ film.genres.join(', ') }}
        </p>

        <button
            @click="openVoteModal(film)"
            class="mt-auto bg-[var(--jaune)] px-4 py-2 rounded-xl font-bold tracking-widest shadow-md hover:scale-105 transition"
        >
          🗳 Voter
        </button>
      </div>
    </section>

    <!-- Modal de vote -->
    <VoteModal
        v-if="showModal"
        :film="selectedFilm"
        :categories="categories"
        @close="showModal = false"
        @submitVote="submitVote"
    />

    <!-- Classement -->
    <section class="mt-15 max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold text-center underline mb-6">
        🏆 Classement des votes
      </h2>

      <div
          v-for="cat in categories"
          :key="cat"
          class="mb-10 bg-[var(--gris)] p-4 rounded-2xl shadow-md"
      >
        <h3 class="text-xl font-semibold mb-3 tracking-widest">
          {{ cat }}
        </h3>

        <ul v-if="classement(cat).length">
          <li
              v-for="item in classement(cat)"
              :key="item.filmId"
              class="flex justify-between border-b py-2 tracking-wide"
          >
            <span>{{ item.title }}</span>
            <span class="font-bold">{{ item.score }} pts</span>
          </li>
        </ul>

        <p v-else class="text-sm text-[var(--grisf)] text-center">
          Aucun vote pour le moment
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useFilmsStore } from "@/stores/modules/films.js"
import { useUserStore } from "@/stores/index.js"
import { useTicketsStore } from "@/stores/modules/tickets.js"
import { useVotesStore } from "@/stores/modules/votes.js"
import VoteModal from "@/components/ScenePrincipal/VoteModal.vue"

const filmsStore = useFilmsStore()
const votesStore = useVotesStore()

const showModal = ref(false)
const selectedFilm = ref(null)

const categories = ["Meilleur scénario", "Meilleurs effets visuels", "Prix du public"]

const openVoteModal = (film) => {
  selectedFilm.value = film
  showModal.value = true
}

const submitVote = async (vote) => {
  try {
    await votesStore.addVote(vote)
    alert("✅ Vote enregistré !")
  } catch (e) {
    alert("⚠️ " + e.message)
  } finally {
    showModal.value = false
  }
}

const classement = (category) => {
  const rows = []
  for (const filmId in votesStore.filmsScore) {
    const score = votesStore.filmsScore[filmId][category] || 0
    const film = filmsStore.films.find(f => f.id === filmId)
    if (film) rows.push({ filmId, title: film.title, score })
  }
  return rows.sort((a, b) => b.score - a.score)
}
</script>

<style scoped></style>
