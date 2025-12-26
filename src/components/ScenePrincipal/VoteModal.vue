<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
      <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          @click="closeModal"
      >
        ✖
      </button>

      <h2 class="text-xl font-bold mb-4">{{ film.title }}</h2>

      <p v-if="!userStore.currentUser" class="text-red-500 mb-4">
        Vous devez être connecté pour voter.
      </p>

      <div v-else>
        <div class="mb-4">
          <label class="block font-medium mb-1">Catégorie :</label>
          <select
              v-model="selectedCategory"
              class="border rounded p-2 w-full"
          >
            <option
                v-for="cat in categories"
                :key="cat"
                :value="cat"
            >
              {{ cat }}
            </option>
          </select>
        </div>

        <p v-if="votedFilmTitle" class="mb-2">
          Tu as déjà voté pour : <strong>{{ votedFilmTitle }}</strong>
        </p>

        <div class="flex justify-between mt-4">
          <button
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              @click="submitVote"
              :disabled="!selectedCategory"
          >
            Voter
          </button>

          <button
              v-if="votedFilmTitle"
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              @click="deleteVote"
          >
            Retirer vote
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useUserStore } from "@/stores/index.js"
import { useVotesStore } from "@/stores/modules/votes.js"
import { useFilmsStore } from "@/stores/modules/films.js"

const props = defineProps({
  film: { type: Object, required: true },
  categories: { type: Array, required: true }
})

const emit = defineEmits(['close'])

const userStore = useUserStore()
const votesStore = useVotesStore()
const filmsStore = useFilmsStore()

const selectedCategory = ref(props.categories[0] || '')

// S'assurer que les films sont chargés pour récupérer le titre
onMounted(async () => {
  if (!filmsStore.films.length) {
    await filmsStore.getFilms()
  }
})

const votedFilmTitle = computed(() => {
  const userId = userStore.currentUser?.id
  if (!userId) return null

  const category = selectedCategory.value
  if (!category) return null

  const filmId = votesStore.votes[userId]?.[category]
  if (!filmId) return null

  const film = filmsStore.films.find(f => f.id === filmId)
  return film?.title || "Film inconnu"
})

const submitVote = async () => {
  if (!userStore.currentUser) {
    alert("Vous devez être connecté pour voter.")
    return
  }

  try {
    await votesStore.addOrUpdateVote({
      filmId: props.film.id,
      userId: userStore.currentUser.id,
      category: selectedCategory.value
    })
    emit("close")
  } catch (err) {
    alert("Erreur réseau, impossible d’ajouter un vote.")
    console.error("Vote error:", err)
  }
}

const deleteVote = async () => {
  try {
    await votesStore.removeVote({
      userId: userStore.currentUser.id,
      category: selectedCategory.value
    })
    emit("close")
  } catch (err) {
    alert("Impossible de retirer le vote : " + err.message)
    console.error("Vote remove error:", err)
  }
}

const closeModal = () => {
  emit("close")
}
</script>

<style scoped></style>
