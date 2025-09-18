<template>
  <div class="relative w-[95%] mx-auto mt-3">
    <div
        ref="slider"
        class="flex overflow-x-scroll scrollbar-hide scroll-smooth snap-x snap-mandatory space-x-4"
    >
      <div
          v-for="(slide, index) in slides"
          :key="index"
          class="snap-center flex-shrink-0 w-1/5 h-56 bg-[var(--blanc)] shadow-lg rounded-lg overflow-hidden flex flex-col"
      >
        <img :src="slide.src" class="w-full h-40 object-cover" />
        <div class="bg-[#001f3f] text-white text-center py-2 text-sm">
          {{ slide.title }}
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

const slides = ref([
  { src: "https://picsum.photos/id/1018/800/400", title: "Crohn" },
  { src: "https://picsum.photos/id/1024/800/400", title: "Crohn" },
  { src: "https://picsum.photos/id/1037/800/400", title: "Crohn" },
  { src: "https://picsum.photos/id/1041/800/400", title: "Crohn" },
  { src: "https://picsum.photos/id/1052/800/400", title: "Crohn" },
  { src: "https://picsum.photos/id/1062/800/400", title: "Crohn" },
  { src: "https://picsum.photos/id/1074/800/400", title: "Crohn" },
  { src: "https://picsum.photos/id/1084/800/400", title: "Crohn" },
])

const slider = ref(null)

function scrollLeft() {
  slider.value.scrollBy({ left: -slider.value.clientWidth / 5, behavior: "smooth" })
}

function scrollRight() {
  slider.value.scrollBy({ left: slider.value.clientWidth / 5, behavior: "smooth" })
}
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
