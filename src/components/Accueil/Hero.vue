<template>
  <div>
    <img
        src="../../assets/img/hero.webp"
        alt="Hero"
        class="w-full h-full object-cover"
    />
    <h1 class="absolute top-1/2 left-[45%] transform -translate-x-1/2 -translate-y-1/2 text-white text-[54px] max-w-[600px] font-bold">
      {{ t('hero.title') }}
    </h1>
  </div>
</template>

<script setup>
import {useI18n} from "vue-i18n";

const { t } = useI18n() // 👈 global = partout la même instance


</script>

<style scoped>
</style>
