<template>
  <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div class="bg-[var(--blanc)] rounded-2xl p-6 max-w-md w-full shadow-lg">
      <h2 class="text-xl font-bold mb-4 text-center">{{ film.title }}</h2>

      <div v-if="message" class="text-red-600 font-semibold text-center mb-4">
        {{ message }}
      </div>

      <div v-for="cat in categories" :key="cat" class="mb-4">
        <p class="font-semibold">{{ cat }}</p>

        <div v-if="hasVoted(cat)">
          <span class="text-green-600 font-bold">✅ Vous avez voté</span>
          <button
              @click="removeVoteForCategory(cat)"
              class="ml-4 bg-red-500 text-white px-2 py-1 rounded font-bold shadow hover:scale-105 transition"
          >
            Retirer
          </button>
        </div>

        <div v-else>
          <button
              @click="submitVoteForCategory(cat)"
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
import { ref } from 'vue'
import { useUserStore } from '@/stores/index.js'
import { useVotesStore } from '@/stores/modules/votes.js'

const props = defineProps({
  film: Object,
  categories: Array
})

const emit = defineEmits(['submitVote', 'removeVote', 'close'])
const userStore = useUserStore()
const votesStore = useVotesStore()
const message = ref('')

// Vérifie si l'utilisateur a voté pour cette catégorie (sur n'importe quel film)
const hasVoted = (category) => {
  if (!userStore.currentUser) return false
  return votesStore.hasVotedCategory(category, userStore.currentUser.id)
}

// Soumettre un vote pour une catégorie
const submitVoteForCategory = (category) => {
  if (!userStore.currentUser) {
    message.value = 'Veuillez vous connecter pour voter.'
    return
  }
  emit('submitVote', {
    filmId: props.film.id,
    category,
    userId: userStore.currentUser.id
  })
}

// Retirer le vote de l'utilisateur pour une catégorie (quel que soit le film)
const removeVoteForCategory = (category) => {
  if (!userStore.currentUser) {
    message.value = 'Veuillez vous connecter pour retirer un vote.'
    return
  }

  const filmId = votesStore.getVotedFilmIdForCategory(category, userStore.currentUser.id)
  if (filmId) {
    emit('removeVote', {
      filmId,
      category,
      userId: userStore.currentUser.id
    })
  }
}
</script>
