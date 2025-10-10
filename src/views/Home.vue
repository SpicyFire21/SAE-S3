<template>
  <Hero/>
  <div class="bg-[var(--blanc)] flex flex-col items-center px-10 py-5">

    <div class="flex flex-row bg-[var(--gris)] justify-center w-fit py-3 px-2 gap-15 scale-125 m-5">
      <button class="bg-[var(--jaune)] px-2 py-1">{{ t('home.takeTicket') }}</button>

      <div class="relative w-80">
        <select
            class="appearance-none shadow-lg w-full rounded px-5 py-1 text-[var(--grisf)] bg-[var(--blanc)]"
        >
          <option>{{ t('home.listTicket') }}</option>
        </select>
        <svg
            class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--grisf)] pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>
    </div>

    <div class="mt-5">
      <div class="mt-5 text-center">
        <h1 class="text-[28px] inline-block bg-[var(--gris)] px-3 py-1">
          {{ t('home.Discover') }}
        </h1>
      </div>
      <div id="carrousel">
        <Carrousel/>
      </div>
    </div>

  </div>

  <div class="flex flex-col gap-10">

    <h1 class="underline ml-10 text-[22px]">{{ t('home.doNotMiss')}}</h1>

    <div class="flex flex-col gap-2">
    <div class="flex gap-10 ml-25">
      <a href="" class="text-[var(--jaune)]">{{ t('home.news')}}</a>
      <a href="" class="text-[var(--grisf)]">{{ t('home.famous')}}</a>
    </div>
    <hr>

      <CardList/>

      
  </div>

  </div>

</template>

<script setup>
import {useI18n} from 'vue-i18n'

const { t } = useI18n()
import Hero from "@/components/Accueil/Hero.vue";
import Carrousel from "@/components/Accueil/Carrousel.vue";
import CardList from "@/components/Accueil/CardList.vue";

</script>
