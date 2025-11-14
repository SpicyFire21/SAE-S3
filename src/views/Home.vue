<template>
  <Hero/>
  <div class="bg-[var(--blanc)] flex flex-col items-center px-10 py-5">
    <div class="flex flex-row bg-[var(--gris)] justify-center w-fit py-3 px-2 gap-15 scale-125 m-5">
      <button class="bg-[var(--jaune)] px-2 py-1">{{ t('home.takeTicket') }}</button>
      <div class="relative w-80">
        <select class="appearance-none shadow-lg w-full rounded px-5 py-1 text-[var(--grisf)] bg-[var(--blanc)]">
          <option>{{ t('home.listTicket') }}</option>
        </select>
        <svg class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--grisf)] pointer-events-none"
             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>
    </div>

    <div class="mt-5 text-center">
      <h1 class="text-[28px] inline-block bg-[var(--gris)] px-3 py-1">{{ t('home.Discover') }}</h1>
      <div id="carrousel"><Carrousel/></div>
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
      <div class="flex flex-col items-center">
        <h1 class="text-2xl underline">{{ t('home.provider') }}</h1>

        <form action="" class="w-full py-5">
          <fieldset class="flex flex-col items-center gap-3">
            <div class="flex flex-col">
              <label for="prest" class="font-[Roboto] tracking-widest text-1">{{t('home.fprovider')}}</label>
              <input type="text" id="prest" v-model="filterName" :placeholder="t('home.fprovider')"
                     class="w-60 px-3 py-2 border-1 border-[var(--noir)] outline-none rounded">
            </div>

            <div class="flex items-center gap-2 font-[Roboto] tracking-widest">
              <p>Note ></p>
              <RankingStars v-model="filterNote"/>
            </div>

            <div class="flex gap-10">
              <div v-for="(item,index) in tabCheckbox" :key="index" class="flex gap-2 items-center font-[Roboto]">
                <label :for="item.id">{{item.name}}</label>
                <input type="checkbox" :id="item.id" v-model="filterTypes" :value="item.name"
                       class="appearance-none w-5 h-5 border-1 border-[var(--noir)] rounded-sm checked:bg-[var(--jaune)] checked:border-[var(--noir)] cursor-pointer">
              </div>
            </div>

            <PrestataireCard :providers="filteredProviders"/>
            <h1 class="text-[30px] max-w-[400px] mt-5 text-center border-b border-gray bottom">
              Votre acteur préféré est présent ? Reservez une dédicace dès maintenant
            </h1>

<div>
<InteractiveMap/>


  </div>


          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useI18n} from 'vue-i18n'
import Hero from "@/components/Accueil/Hero.vue";
import Carrousel from "@/components/Accueil/Carrousel.vue";
import CardList from "@/components/Accueil/CardList.vue";
import RankingStars from "@/components/Accueil/RankingStars.vue";
import PrestataireCard from "@/components/Accueil/PrestataireCard.vue";
import { ref, onMounted, computed } from "vue";
import { getUsers } from "@/services/user.service.js";
import InteractiveMap from "@/components/Accueil/InteractiveMap.vue";

const { t, tm } = useI18n()
const tabCheckbox = computed(() => tm('checkboxfilter'))

const providers = ref([]);
const filterName = ref('');
const filterNote = ref(0);
const filterTypes = ref([]);

onMounted(async () => {
  const res = await getUsers();
  if (res.error === 0) providers.value = res.data;
});

const filteredProviders = computed(() => {
  return providers.value.filter(provider => {
    const matchName = provider.name.toLowerCase().includes(filterName.value.toLowerCase());
    const matchNote = provider.note >= filterNote.value; // demi-étoiles incluses
    const matchType = filterTypes.value.length ? filterTypes.value.includes(provider.type) : true;
    const matchDroit = Number(provider.droit) === 1;
    return matchName && matchNote && matchType && matchDroit;
  });
});

</script>

<style scoped>
</style>







