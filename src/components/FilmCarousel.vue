<template>
  <div class="pt-15">
    <div class="w-full relative">
      <h2 class="text-3xl font-bold text-left mb-6 ml-12 uppercase tracking-wider text-[var(--jaune)]">
        {{ category }}
      </h2>

      <button
          type="button"
          @click="scrollLeft"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg z-10 hover:bg-white transition"
      >
        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <div
          ref="carousel"
          class="flex overflow-x-auto gap-6 scroll-smooth snap-x scrollbar-hide px-12"
      >
        <div
            v-for="(slide, index) in films.filter(film => film.genres.includes(category))"
            :key="index"
            class="snap-center flex-shrink-0 w-1/5 h-full shadow-xl rounded-xl overflow-hidden flex flex-col relative"
        >
          <img :src="getFilmImage(slide.poster)" class="w-full h-60 object-cover" alt="film"/>
          <div class="absolute inset-0 flex flex-col h-full px-4 py-3 justify-end bg-gradient-to-t from-[var(--noir)]/80 to-transparent text-[var(--blanc)]">
            <h1 class="text-2xl font-semibold mb-1">{{ slide.title }}</h1>
            <em class="text-sm mb-2">{{ getDirectorName(slide.director_id) }}</em>
            <div class="flex flex-wrap gap-1 mb-3">
              <span
                  v-for="genre in slide.genres"
                  :key="genre"
                  class="text-[var(--noir)] bg-[var(--jaune)] px-2 py-0.5 rounded-full text-xs font-medium"
              >
                {{ genre }}
              </span>
            </div>
            <button @click="goToDetails(slide.id)" class="bg-[var(--jaune)] text-[var(--noir)] w-full py-1 rounded-md hover:brightness-110 transition">
              {{ t('cardlist.learnMore') }}
            </button>
          </div>
        </div>
      </div>

      <button
          type="button"
          @click="scrollRight"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg z-10 hover:bg-white transition"
      >
        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import router from "@/router/index.js";

const { t } = useI18n()

defineProps({
  films: { type: Array, required: true },
  category: { type: Array, required: true},
  getDirectorName: { type: Function, required: true }
})

const carousel = ref<HTMLDivElement | null>(null)

const getFilmImage = (fileName) =>
    new URL(`../assets/img/${fileName}`, import.meta.url).href

const scrollAmount = () => carousel.value ? carousel.value.offsetWidth / 5 : 0

const scrollLeft = () => carousel.value?.scrollBy({ left: -scrollAmount(), behavior: 'smooth' })
const scrollRight = () => carousel.value?.scrollBy({ left: scrollAmount(), behavior: 'smooth' })

function goToDetails(id) {
  router.push({ name: 'FilmDetails', params: { id } })
  console.log("test id: " + id)
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
