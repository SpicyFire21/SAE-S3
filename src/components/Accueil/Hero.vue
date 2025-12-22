<template>
  <div
      class="relative w-full overflow-hidden
           h-[60vh] sm:h-[65vh] md:h-[75vh] lg:h-[100vh]"
  >

    <img
        src="../../assets/img/hero.webp"
        alt="Hero"
        class="absolute inset-0 w-full h-full object-cover object-center"
    />

    <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80"></div>

    <div
        class="relative z-10 flex flex-col items-start
       justify-center ml-20
       h-full text-left px-12 md:px-24"
    >
      <h1
          class="text-white font-extrabold tracking-tight
           text-4xl sm:text-5xl md:text-6xl lg:text-7xl
           drop-shadow-xl"
      >
        Le Grand Focus
      </h1>

      <h2
          class="text-yellow-400 mt-4
           text-1xl sm:text-2xl md:text-3xl lg:text-4xl
           font-semibold drop-shadow-lg"
      >
        {{ t('hero.title') }}
      </h2>

      <p
          class="text-white/95 mt-6
           text-sm sm:text-base md:text-lg lg:text-xl
           max-w-3xl leading-relaxed drop-shadow"
      >
        {{ t('home.description2') }}
      </p>

      <button
          @click="scrollDown"
          class="mt-8 w-40 h-11 flex items-center justify-center
           rounded-full bg-yellow-400 text-black font-bold
           hover:bg-yellow-500 hover:scale-105
           transition shadow-xl"
      >
        Découvrir
      </button>
    </div>


  </div>
</template>

<script setup>
import {useI18n} from "vue-i18n";

const {t} = useI18n();

function scrollDown() {
  window.scrollBy({
    top: 600,
    left: 0,
    behavior: "smooth",
  });
}
</script>

<style scoped>
</style>
