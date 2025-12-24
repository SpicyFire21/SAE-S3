<template>
  <div class="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
    <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
      <h2 class="text-xl font-bold mb-4">Voter pour : {{ film.title }}</h2>

      <label class="block mb-2 font-medium">Catégorie</label>
      <select v-model="selectedCategory" class="w-full border p-2 rounded-lg mb-4">
        <option disabled value="">Choisir une catégorie</option>
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>

      <label class="block mb-2 font-medium">Note (1 vote = 1 point)</label>
      <div class="flex gap-2 mb-6">
        <button
            v-for="s in 5"
            :key="s"
            @click="score = s"
            class="px-3 py-1 border rounded-lg"
            :class="{ 'bg-black text-white': score === s }"
        >
          {{ s }}
        </button>
      </div>

      <div class="flex justify-end gap-3">
        <button @click="$emit('close')" class="px-4 py-2 border rounded-lg">Annuler</button>
        <button @click="submit" class="px-4 py-2 bg-black text-white rounded-lg">Valider le vote</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVotesStore } from '@/stores/modules/votes.js'

const props = defineProps({
  film: Object,
  categories: Array
})

const emit = defineEmits(['close', 'submitVote'])

const votesStore = useVotesStore()

const selectedCategory = ref("")
const score = ref(1)

const submit = () => {
  if (!selectedCategory.value) {
    alert("Veuillez choisir une catégorie")
    return
  }

  const userId = localStorage.getItem("session_user") // mock session
  if (!userId) {
    alert("Vous devez être connecté pour voter")
    return
  }

  const vote = {
    userId,
    filmId: props.film.id,
    category: selectedCategory.value,
    score: score.value
  }

  emit('submitVote', vote)
}
</script>
