<template>
  <div>
    <img
        src="../../assets/img/hero.webp"
        alt="Hero"
        class="w-full h-full object-cover"
    />


    <div   class="absolute top-1/2 left-[45%] transform -translate-x-1/2 -translate-y-1/2 text-[var(--blanc)] max-w-[600px] font-bold">
      <h1 class="text-[60px]">Le Grand Focus</h1>

      <h2 class="text-[35px]">{{ t('hero.title') }}</h2>
    </div>

  </div>
</template>

<script setup>
import {useI18n} from "vue-i18n";

const { t } = useI18n() // 👈 global = partout la même instance


</script>

<style scoped>
</style>
