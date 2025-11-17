<template>
  <div class="relative w-full px-4 mt-3">

    <div
        ref="slider"
        class="flex overflow-x-scroll scrollbar-hide scroll-smooth snap-x snap-mandatory space-x-6 px-2"
    >
      <div
          v-for="(provider, index) in providers"
          :key="index"
          class="snap-center flex-shrink-0 w-[calc((100%-48px)/5)] bg-[var(--blanc)] shadow-lg rounded-lg overflow-hidden flex flex-col"
      >
        <img :src="getProviderImage(provider.nom_photo)" class="w-full h-40 object-cover" alt="" />

        <div class="text-[var(--blanc)] text-center py-2 flex items-center justify-center">
          <div class="bg-[var(--bleu)] px-2 py-0">{{ provider.name }}</div>
        </div>
      </div>
    </div>

    <button
        @click="scrollLeft"
        class="absolute top-1/2 left-2 -translate-y-1/2 bg-[var(--noir)] text-[var(--blanc)] px-3 py-2 rounded-full"
    >
      ‹
    </button>

    <button
        @click="scrollRight"
        class="absolute top-1/2 right-2 -translate-y-1/2 bg-[var(--noir)] text-[var(--blanc)] px-3 py-2 rounded-full"
    >
      ›
    </button>
  </div>
</template>



<script setup>
import { ref } from "vue"


defineProps({
  providers: { type: Array, required: true },
})

const slider = ref(null)

function scrollLeft() {
  slider.value.scrollBy({ left: -slider.value.clientWidth / 5, behavior: "smooth" })
}

function scrollRight() {
  slider.value.scrollBy({ left: slider.value.clientWidth / 5, behavior: "smooth" })
}

const getProviderImage = (fileName) => new URL(`../../assets/img/${fileName}`, import.meta.url).href
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
