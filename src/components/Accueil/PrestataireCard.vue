<template>
  <div class="relative w-full px-4">

    <button @click="scrollLeft" type="button"
            class="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg z-10 hover:bg-white transition">
      <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>

    <div ref="carousel" class="flex overflow-x-auto gap-4 scroll-smooth scrollbar-hide snap-x snap-mandatory">
      <div
          v-for="(provider, index) in providers"
          :key="provider.id || index"
          class="bg-white flex-shrink-0 p-6 border border-gray-300 rounded-lg shadow-lg flex flex-col items-center snap-start"
          style="flex: 0 0 calc((100% - 2rem)/3);"
      >
      <img v-if="provider.nom_photo" :src="getProviderImage(provider.nom_photo)" :alt="provider.name || 'Prestataire'"
           class="w-28 h-28 object-cover rounded-3xl mb-4"/>
      <p class="text-[var(--bleu)] text-xl mb-1 text-center">{{ provider.name || '—' }}</p>
      <p class="text-gray-300 mb-2 text-center">{{ provider.type || '—' }}</p>

      <div class="flex items-center mb-2 space-x-1">
        <template v-for="i in 5" :key="i">
          <svg v-if="i <= Math.floor(averageNote(provider.note))" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 0 0 .95.69h4.147c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 0 0-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 0 0-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 0 0-.364-1.118L2.078 9.378c-.783-.57-.38-1.81.588-1.81h4.147a1 1 0 0 0 .95-.69l1.286-3.95z"/>
          </svg>
          <svg v-else-if="i === Math.ceil(averageNote(provider.note)) && averageNote(provider.note) % 1 !== 0" class="w-5 h-5" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half-grad">
                <stop offset="50%" stop-color="#FACC15"/>
                <stop offset="50%" stop-color="#D1D5DB"/>
              </linearGradient>
            </defs>
            <path fill="url(#half-grad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 0 0 .95.69h4.147c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 0 0-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 0 0-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 0 0-.364-1.118L2.078 9.378c-.783-.57-.38-1.81.588-1.81h4.147a1 1 0 0 0 .95-.69l1.286-3.95z"/>
          </svg>
          <svg v-else class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 0 0 .95.69h4.147c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 0 0-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 0 0-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 0 0-.364-1.118L2.078 9.378c-.783-.57-.38-1.81.588-1.81h4.147a1 1 0 0 0 .95-.69l1.286-3.95z"/>
          </svg>
        </template>
      </div>

      <p class="text-gray-500 mb-4 text-sm font-roboto text-center">{{ provider.description }}</p>
      <a href="#" class="inline-flex items-center text-white tracking-widest bg-yellow-500 hover:bg-yellow-600 font-medium rounded-md text-sm px-4 py-2.5">
        {{ t('prestataireCard.giveOpinion') }}
      </a>
    </div>
  </div>

  <button @click="scrollRight" class="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg z-10 hover:bg-white transition" type="button">
    <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
    </svg>
  </button>
  </div>
</template>

<script setup>
import { ref,computed,onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({ providers: { type: Array, required: true } })
const carousel = ref(null)

const getProviderImage = (fileName) =>
    new URL(`../../assets/img/${fileName}`, import.meta.url).href

// Scroll par carte
const scrollLeft = () => {
  const card = carousel.value.querySelector('div')
  const scroll = card.offsetWidth + parseInt(getComputedStyle(card).marginRight)
  carousel.value.scrollBy({ left: -scroll, behavior: 'smooth' })
}

const scrollRight = () => {
  const card = carousel.value.querySelector('div')
  const scroll = card.offsetWidth + parseInt(getComputedStyle(card).marginRight)
  carousel.value.scrollBy({ left: scroll, behavior: 'smooth' })
}


const averageNote = (notes) => {
  if (!notes || notes.length === 0) return 0;
  const sum = notes.reduce((acc, val) => acc + val, 0);
  return sum / notes.length;
};

</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.snap-x { scroll-snap-type: x mandatory; }
.snap-start { scroll-snap-align: start; }
</style>
