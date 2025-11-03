<template>
  <img
      src="@/assets/img/hero.webp"
      alt="Hero"
      class="w-full h-full object-cover absolute z-[-1]"
  />
  <div class="w-screen h-screen flex justify-center items-center">

    <div class="shadow-2xl p-5 rounded-lg bg-[var(--blanc)] flex items-center flex-col gap-3 w-fit">
      <h1 class="text-[28px] text-center">{{ t('ticketpay.title')}}</h1>
      <p>{{ t('ticketpay.content')}} : {{route.params.id}}</p>
      <a href="">{{ t('ticketpay.btn')}}</a>
    </div>
  </div>

</template>

<script setup>
import {useRoute} from "vue-router";
import {useI18n} from 'vue-i18n'

const { t } = useI18n()
const route = useRoute();

</script>


<style scoped>

</style>