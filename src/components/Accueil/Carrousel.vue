<template>
  <div class="relative w-full max-w-5xl mx-auto mt-10">
    <div
        ref="slider"
        class="flex overflow-x-scroll scrollbar-hide scroll-smooth snap-x snap-mandatory space-x-4"
    >
      <div
          v-for="(slide, index) in slides"
          :key="index"
          class="snap-center flex-shrink-0 w-80 h-48 bg-[var(--blanc)] shadow-lg rounded-lg overflow-hidden"
      >
        <img :src="slide" class="w-full h-full object-cover" />
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

const slides = ref([
  "https://picsum.photos/id/1018/800/400",
  "https://picsum.photos/id/1024/800/400",
  "https://picsum.photos/id/1037/800/400",
  "https://picsum.photos/id/1041/800/400",
  "https://picsum.photos/id/1052/800/400"
])

const slider = ref(null)

function scrollLeft() {
  slider.value.scrollBy({ left: -300, behavior: "smooth" })
}

function scrollRight() {
  slider.value.scrollBy({ left: 300, behavior: "smooth" })
}
</script>

<style>
/* Masquer la scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
