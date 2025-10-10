<template>

  <div class="flex justify-evenly">
    <div
        v-for="(slide, index) in slides"
        :key="index"
        class="snap-center flex-shrink-0 w-1/5 shadow-lg rounded-lg overflow-hidden flex flex-col relative"
    >
      <img :src="slide.src" class="w-full h-40 object-cover"  alt="prestataires"/>
      <div class="absolute inset-0 top-20 flex flex-col h-20 p-3 items-center justify-center text-white bg-black/40">
        <h1>{{ slide.title }}</h1>
        <em>{{ slide.note }}</em>
        <button class="bg-[var(--jaune)] text-[var(--noir)] w-full py-1 border-[var(--jaune)] rounded">
          {{ t('cardlist.learnMore') }}</button>
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">

import {ref} from "vue";
import {useI18n} from 'vue-i18n'

const { t } = useI18n()
const slides = ref([
  { src: "https://picsum.photos/id/1018/800/400", title: "Leonardo DiCaprio",note:"5/5" },
  { src: "https://picsum.photos/id/1024/800/400", title: "Gérard Depardieu",note:"4.5/5" },
  { src: "https://picsum.photos/id/1037/800/400", title: "Brad Pitt",note:"4.5/5" },
])

</script>

<style scoped>

</style>