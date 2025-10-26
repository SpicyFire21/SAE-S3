<template>
  <div class="flex items-center space-x-1 select-none">
    <div
        v-for="star in 5"
        :key="star"
        class="relative text-3xl cursor-pointer"
        @mousemove="onHover($event, star)"
        @mouseleave="hoverRating = 0"
        @click="onClick($event, star)"
    >
      <!-- Fond étoile vide -->
      <span class="text-gray-400">★</span>

      <!-- Couche jaune pour les parties remplies -->
      <span
          class="absolute left-0 top-0 text-yellow-400 overflow-hidden"
          :style="{ width: getFillWidth(star) }"
      >
        ★
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['update:rating'])
const rating = ref(0)
const hoverRating = ref(0)

// 🔹 Survol : arrondi à 0.5 près
function onHover(event, star) {
  const { offsetX, target } = event
  const width = target.clientWidth
  let value = star - (offsetX < width / 2 ? 0.5 : 0)
  hoverRating.value = Math.round(value * 2) / 2
}

// 🔹 Clic : arrondi à 0.5 près
function onClick(event, star) {
  const { offsetX, target } = event
  const width = target.clientWidth
  let value = star - (offsetX < width / 2 ? 0.5 : 0)
  rating.value = Math.round(value * 2) / 2
  emit('update:rating', rating.value)
  console.log(rating.value, "étoiles")
}

// 🔹 Calcul du remplissage
function getFillWidth(star) {
  const value = hoverRating.value || rating.value
  if (value >= star) return '100%'
  if (value + 0.5 > star - 0.001 && value + 0.5 < star + 0.001) return '50%'
  return '0%'
}
</script>
