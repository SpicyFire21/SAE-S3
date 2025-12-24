<template>
  <div class="mt-10">
    <h2 class="text-2xl font-bold mb-4">Classement des Pablos</h2>

    <div v-for="cat in categories" :key="cat" class="mb-8">
      <h3 class="text-xl font-semibold mb-2">{{ cat }}</h3>

      <table class="w-full border rounded-lg overflow-hidden">
        <thead>
        <tr class="border-b">
          <th class="text-left p-3">Film</th>
          <th class="text-right p-3">Score</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in classementByCategory(cat)" :key="row.filmId" class="border-b">
          <td class="p-3">{{ row.title }}</td>
          <td class="text-right p-3">{{ row.score }}</td>
        </tr>
        <tr v-if="classementByCategory(cat).length === 0">
          <td class="p-3 text-gray-500" colspan="2">Aucun vote</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useVotesStore } from '@/stores/modules/votes.js'
import { useFilmsStore } from '@/stores/modules/films.js'

const votesStore = useVotesStore()
const filmsStore = useFilmsStore()

const categories = votesStore.categories

function classementByCategory(category) {
  const result = []

  for (const filmId in votesStore.filmsScore) {
    const score = votesStore.filmsScore[filmId][category] || 0
    const film = filmsStore.films.find(f => f.id === filmId)

    if (film) {
      result.push({ filmId, title: film.title, score })
    }
  }

  return result.sort((a, b) => b.score - a.score)
}

function classementByCategory(cat) {
  return classementByCategory(cat)
}
</script>
