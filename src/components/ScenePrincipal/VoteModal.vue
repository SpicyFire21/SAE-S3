<template>
  <div class="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
    <div class="bg-[var(--blanc)] rounded-2xl p-6 max-w-md w-full shadow-lg">
      <h2 class="text-xl font-bold mb-4 text-center">{{ film.title }}</h2>

      <div v-if="message" class="text-red-600 font-semibold text-center mb-4">
        {{ message }}
      </div>

      <div v-for="catName in categories" :key="catName" class="mb-4">
        <p class="font-semibold">{{ catName }}</p>

        <!-- Vérifie si l'utilisateur a voté pour cette catégorie sur ce film -->
        <div v-if="hasVoted(catName)">
          <span class="text-green-600 font-bold">✅ Vous avez voté</span>
          <button
              @click="removeVoteForCategory(catName)"
              class="ml-4 bg-red-500 text-white px-2 py-1 rounded font-bold shadow hover:scale-105 transition"
          >
            Retirer
          </button>
        </div>

        <div v-else>
          <button
              @click="submitVoteForCategory(catName)"
              class="bg-[var(--jaune)] px-4 py-1 rounded font-bold shadow hover:scale-105 transition"
          >
            Voter
          </button>
        </div>
      </div>

      <button
          @click="$emit('close')"
          class="mt-4 bg-gray-300 px-4 py-1 rounded font-semibold hover:bg-gray-400"
      >
        Fermer
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/index.js'
import { useVotesStore } from '@/stores/modules/votes.js'
import { useFilmsStore } from "@/stores"

const props = defineProps({
  film: Object,
  categories: Array
})

const emit = defineEmits(['close'])
const userStore = useUserStore()
const votesStore = useVotesStore()
const message = ref('')

// --- recupere les votes de l'utilisateur actuel ---
const userVotes = computed(() => {
  if (!userStore.currentUser) return []
  return votesStore.votes.filter(v => v.userId === userStore.currentUser.id)
})

// --- vérifie si l'utilisateur a déjà voté pour cette catégorie sur ce film ---
const hasVoted = (categoryName) => {
  if (!userStore.currentUser || !props.film) return false
  const cat = votesStore.categories.find(c => c.category_name === categoryName)
  if (!cat) return false

  // Vérifie bien film + catégorie + user
  return votesStore.votes.some(v =>
      v.userId === userStore.currentUser.id &&
      v.category_id === cat.id &&
      v.filmId === props.film.id
  )
}

// --- actions pour voter / retirer un vote ---
const submitVoteForCategory = async (categoryName) => {
  if (!userStore.currentUser || !props.film) return

  const cat = votesStore.categories.find(c => c.category_name === categoryName)
  if (!cat) return

  // Bloque si déjà voté pour UN film dans cette catégorie
  const alreadyVoted = votesStore.votes.find(v =>
      v.userId === userStore.currentUser.id &&
      v.category_id === cat.id
  )

  if (alreadyVoted) {
    const filmsStore = useFilmsStore()
    const film = filmsStore.films.find(f => f.id === alreadyVoted.filmId)

    const filmName = film ? film.title : "Inconnu"

    message.value = `Vous avez déjà voté pour "${filmName}" dans la catégorie "${cat.category_name}"`
    return
  }

  const res = await votesStore.AddVote({
    userId: userStore.currentUser.id,
    category_id: cat.id,
    filmId: props.film.id
  })

  console.log("Vote ajouté API :", res)

  if (res?.error === 0) {
    await votesStore.updateScore(
        { filmId: props.film.id, category_id: cat.id },
        1
    )
    await votesStore.getVotes()
    await votesStore.getVotesByUserId(userStore.currentUser.id)
    await votesStore.getScores()
    message.value = ''
  } else {
    message.value = res?.data || "Impossible d'ajouter le vote"
  }

  //console.log("Votes store après ajout :", votesStore.votes)
}

const removeVoteForCategory = async (categoryName) => {
  if (!userStore.currentUser || !props.film) return

  const cat = votesStore.categories.find(c => c.category_name === categoryName)
  if (!cat) return

  // Trouver précisément le vote du film courant
  const voteFilm = votesStore.votes.find(v =>
      v.userId === userStore.currentUser.id &&
      v.category_id === cat.id &&
      v.filmId === props.film.id
  )

  if (!voteFilm) {
    message.value = "Impossible de supprimer le vote"
    return
  }

  // Appel API via store (filmId ignoré côté controller mais on s'en fout)
  const res = await votesStore.removeVote({
    userId: userStore.currentUser.id,
    category_id: cat.id
  })

  console.log("Vote supprimé API :", res)

  if (res?.error === 0) {
    await votesStore.updateScore(
        { filmId: props.film.id, category_id: cat.id },
        -1
    )
    // Recharger tous les votes pour resync
    await votesStore.getVotes()
    await votesStore.getVotesByUserId(userStore.currentUser.id)
    await votesStore.getScores()
    message.value = ''
  } else {
    message.value = res?.data || "Impossible de supprimer le vote"
  }

  //console.log("Votes store après suppression :", votesStore.votes)
}


</script>
