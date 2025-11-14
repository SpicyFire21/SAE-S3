<template>

  <div class="flex justify-evenly">
    <div
        v-for="(slide, index) in films"
        :key="index"
        class="snap-center flex-shrink-0 w-1/5 h-full shadow-lg rounded-lg overflow-hidden flex flex-col relative"
    >
      <img :src="getFilmImage(slide.poster)" class="w-full h-60 object-cover"  alt="prestataires"/>
      <div class="absolute inset-0 top-30 flex flex-col h-30 px-3 items-center justify-center text-[var(--blanc)] bg-[var(--noir)]/40">
        <h1 class="text-xl">{{ slide.title }}</h1>
        <em>{{ getDirectorName(slide.director_id) }}</em>
        <button class="bg-[var(--jaune)] text-[var(--noir)] w-full py-1 border-[var(--jaune)] rounded">
          {{ t('cardlist.learnMore') }}</button>
      </div>
    </div>
  </div>
  <div class="flex justify-end pr-6 mt-3">
    <h1 class="text-3xl flex items-center">
      {{ t('cardlist.seeAll') }}
      <span class="text-lg text-gray-600 ml-4">></span><span class="text-4xl">></span>
    </h1>
  </div>



</template>

<script setup lang="ts">
import {useI18n} from 'vue-i18n'

const { t } = useI18n()

defineProps({
  films: {
    type: Array,
    required: true
  },
  getDirectorName: {
    type: Function,
    required: true
  },
});


const getFilmImage = (fileName) => {
  return new URL(`../../assets/img/${fileName}`, import.meta.url).href;
};




</script>

<style scoped>

</style>