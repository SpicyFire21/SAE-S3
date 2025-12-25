<template>
  <div class="vote-modal-overlay">
    <div class="vote-modal">
      <h2 class="text-xl font-bold mb-4">{{ film.title }}</h2>

      <div class="mb-4">
        <label class="block font-medium mb-2">Choisir la catégorie :</label>
        <select v-model="selectedCategory" class="border rounded px-2 py-1 w-full">
          <option disabled value="">-- Sélectionner une catégorie --</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div v-if="selectedCategory" class="mb-4">
        <p>
          <span v-if="existingVote">Vous avez déjà voté pour : <strong>{{ existingVoteFilmTitle }}</strong></span>
          <span v-else>Vous n'avez pas encore voté dans cette catégorie.</span>
        </p>
      </div>

      <div class="flex justify-between mt-6">
        <button
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
            :disabled="!existingVote"
            @click="deleteVote"
        >
          Retirer mon vote
        </button>

        <button
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            :disabled="!selectedCategory || existingVote"
            @click="submitVote"
        >
          Voter
        </button>

        <button
            class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            @click="closeModal"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useUserStore } from "@/stores/index.js"
import { useVotesStore } from "@/stores/modules/votes.js"

const props = defineProps({
  film: { type: Object, required: true },
  categories: { type: Array, required: true }
})

const emit = defineEmits(['close'])

const userStore = useUserStore()
const votesStore = useVotesStore()

const selectedCategory = ref("")

const existingVote = computed(() => {
  if (!userStore.currentUser) return null
  return votesStore.votes[userStore.currentUser.id]?.[selectedCategory.value] || null
})

const existingVoteFilmTitle = computed(() => {
  if (!existingVote.value) return ""
  const filmId = existingVote.value
  return props.film.id === filmId ? props.film.title : "un autre film"
})

const deleteVote = () => {
  try {
    votesStore.removeVote({
      userId: userStore.currentUser.id,
      category: selectedCategory.value
    })
    selectedCategory.value = ""
    emit("close")
  } catch (e) {
    alert("⚠️ " + e.message)
  }
}

const submitVote = () => {
  if (!selectedCategory.value) return
  votesStore.addOrUpdateVote({
    filmId: props.film.id,
    userId: userStore.currentUser.id,
    category: selectedCategory.value
  })
  selectedCategory.value = ""
  emit("close")
}

const closeModal = () => {
  selectedCategory.value = ""
  emit("close")
}
</script>

<style scoped>
.vote-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.vote-modal {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.vote-modal select {
  border: 1px solid #ccc;
  border-radius: 4px;
}

button:disabled {
  cursor: not-allowed;
}
</style>
