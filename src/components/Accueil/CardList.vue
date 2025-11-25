<template>
  <div class="w-full relative">
    <!-- Bouton gauche -->
    <button
        type="button"
        @click="scrollLeft"
        class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg z-10 hover:bg-white transition"
    >
      <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>

    <!-- Carousel -->
    <div
        ref="carousel"
        class="flex overflow-x-auto gap-6 scroll-smooth snap-x scrollbar-hide px-12"
    >
      <div
          v-for="(slide, index) in films"
          :key="index"
          class="snap-center flex-shrink-0 w-1/5 h-full shadow-lg rounded-lg overflow-hidden flex flex-col relative"
      >
        <img :src="getFilmImage(slide.poster)" class="w-full h-60 object-cover" alt="film"/>
        <div class="absolute inset-0 top-30 flex flex-col h-30 px-3 items-center justify-center text-[var(--blanc)] bg-[var(--noir)]/40">
          <h1 class="text-xl text-center">{{ slide.title }}</h1>
          <em>{{ getDirectorName(slide.director_id) }}</em>
          <button @click="goToDetails(slide.id)" class="bg-[var(--jaune)] text-[var(--noir)] w-full py-1 border-[var(--jaune)] rounded mt-2 hover:brightness-110 transition">
            {{ t('cardlist.learnMore') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Bouton droit -->
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

  <!-- Lien voir tout -->
  <div class="flex justify-end pr-6 mt-3">
    <RouterLink to="/films" class="group">
      <h1 class="text-3xl flex items-center transition-transform duration-300 group-hover:translate-x-2 group-hover:text-yellow-500 cursor-pointer">
        {{ t('cardlist.seeAll') }}
        <span class="text-lg text-gray-600 ml-4 transition-transform duration-300 group-hover:translate-x-2">&gt;</span>
        <span class="text-4xl transition-transform duration-300 group-hover:translate-x-2">&gt;</span>
      </h1>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import router from "../../router/index.js";

const { t } = useI18n()


defineProps({
  films: { type: Array, required: true },
  getDirectorName: { type: Function, required: true }
})

const carousel = ref<HTMLDivElement | null>(null)

// Récupère l'image du film
const getFilmImage = (fileName: string) =>
    new URL(`../../assets/img/${fileName}`, import.meta.url).href

// Scroll amount basé sur la largeur du carousel
const scrollAmount = () => carousel.value ? carousel.value.offsetWidth / 5 : 0

const scrollLeft = () => carousel.value?.scrollBy({ left: -scrollAmount(), behavior: 'smooth' })
const scrollRight = () => carousel.value?.scrollBy({ left: scrollAmount(), behavior: 'smooth' })

function goToDetails(id) {
  router.push({ name: 'FilmDetails', params: { id } })
  console.log("test id: " + id)
}
</script>

<style scoped>
/* Cache totalement la scrollbar */
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
