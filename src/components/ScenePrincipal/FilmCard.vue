<template>
  <div class="film-card">
    <h3>{{ film.title }}</h3>
    <p>Réalisateur: {{ film.director }}</p>
    <button @click="$emit('vote', film)">Voter</button>
    <div v-for="cat in categories" :key="cat">
      Score {{ cat }}: {{ filmScore[cat] || 0 }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useVotesStore } from "@/stores/modules/votes.js"

const props = defineProps({
  film: Object
})

const emit = defineEmits(['vote'])
const votesStore = useVotesStore()

const categories = votesStore.categories

const filmScore = computed(() => votesStore.filmsScore[props.film.id] || {})
</script>

<style scoped>
.film-card { border: 1px solid #ccc; padding: 10px; margin: 5px; border-radius: 5px;}
</style>
