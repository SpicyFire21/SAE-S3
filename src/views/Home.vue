<template>
  <Hero/>
  <div class="bg-[var(--blanc)] flex flex-col items-center px-10 py-5">

    <div class="flex flex-row bg-[var(--gris)] justify-center w-fit py-3 px-2 gap-15 scale-125 m-5">
      <button class="bg-[var(--jaune)] px-2 py-1">{{ t('home.takeTicket') }}</button>
      <div class="relative w-80">
        <select v-model="selectedTicket"
                @change="goToTicketPage"
                class="appearance-none shadow-lg w-full rounded px-5 py-1 text-[var(--grisf)] bg-[var(--blanc)]">
          <option value="">{{ t('home.listTicket') }}</option>
          <option v-for="ticket in ticketsStore.ticketsPrice" :key="ticket.id">
            {{ ticket.name }} - {{ ticket.price }}€
          </option>
        </select>
        <svg class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--grisf)] pointer-events-none"
             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5H7z"/>
        </svg>
      </div>
    </div>

    <div class="mt-5 text-center w-full">
      <h1 class="text-[28px] inline-block bg-[var(--gris)] px-3 py-1">{{ t('home.Discover') }}</h1>
      <div id="carrousel" class="w-full max-w-screen-xl mx-auto px-4">
        <Carrousel v-if="userStore.providers && userStore.providers.length" :providers="userStore.providers"/>
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-10">
    <h1 class="underline ml-10 text-[22px]">{{ t('home.doNotMiss') }}</h1>
    <div class="flex flex-col gap-2">
      <div class="flex gap-10 ml-25">
        <button
            :class="{'text-[var(--jaune)] border font-semibold tracking-widest': activeTab === 'news', 'text-[var(--grisf)] tracking-widest': activeTab !== 'news'}"
            class="px-4 rounded"
            @click="activeTab = 'news'"
        >
          {{ t('home.news') }}
        </button>
        <button
            :class="{'text-[var(--jaune)] border font-semibold tracking-widest': activeTab === 'famous', 'text-[var(--grisf)] tracking-widest': activeTab !== 'famous'}"
            class="px-4 rounded"
            @click="activeTab = 'famous'"
        >
          {{ t('home.famous') }}
        </button>
      </div>
      <hr>
      <CardList v-if="activeTab === 'news'" :films="filteredNewFilms" :getDirectorName="getDirectorName"/>
      <CardList v-if="activeTab === 'famous'" :films="filteredFamousFilms" :getDirectorName="getDirectorName"/>
      <div class="flex flex-col items-center">
        <h1 class="text-2xl underline">{{ t('home.provider') }}</h1>

        <form action="" class="w-full py-5">
          <fieldset class="flex flex-col items-center gap-3">
            <div class="flex flex-col">
              <label for="prest" class="font-[Roboto] tracking-widest text-1">{{ t('home.fprovider') }}</label>
              <input type="text" id="prest" v-model="filterName" :placeholder="t('home.fprovider')"
                     class="w-60 px-3 py-2 border-1 border-[var(--noir)] outline-none rounded">
            </div>

            <div class="flex items-center gap-2 font-[Roboto] tracking-widest">
              <p>Note ></p>
              <RankingStars v-model="filterNote"/>
            </div>

            <div class="flex gap-10">
              <div v-for="(item,index) in tabCheckbox" :key="index" class="flex gap-2 items-center font-[Roboto]">
                <label :for="item.id">{{ item.name }}</label>
                <input type="checkbox" :id="item.id" v-model="filterTypes" :value="item.name"
                       class="appearance-none w-5 h-5 border-1 border-[var(--noir)] rounded-sm checked:bg-[var(--jaune)] checked:border-[var(--noir)] cursor-pointer">
              </div>
            </div>
          </fieldset>
        </form>
        <PrestataireCard :providers="filteredProviders"/>
        <h1 class="text-[30px] max-w-[400px] mt-5 text-center border-b border-gray bottom">
          {{ t('home.favActor') }}
        </h1>

        <div>
          <InteractiveMap/>


        </div>


      </div>
    </div>
  </div>
  <Footer/>
</template>

<script setup>
import {useI18n} from 'vue-i18n'
import Hero from "@/components/Accueil/Hero.vue";
import Carrousel from "@/components/Accueil/Carrousel.vue";
import CardList from "@/components/Accueil/CardList.vue";
import RankingStars from "@/components/Accueil/RankingStars.vue";
import PrestataireCard from "@/components/Accueil/PrestataireCard.vue";
import {ref, onMounted, computed} from "vue";
import InteractiveMap from "@/components/Accueil/InteractiveMap.vue";
import {useFilmsStore} from "@/stores/modules/films.js";
import {useReservationsStore, useUserStore} from "@/stores/index.js";
import {useTicketsStore} from "@/stores/modules/tickets.js";
import router from "@/router/index.js";
import Footer from "@/components/Footer.vue";
import {films_reservations} from "@/datasource/data.js";

const {t, tm} = useI18n()
const tabCheckbox = computed(() => tm('checkboxfilter'))

const filterName = ref('');
const filterNote = ref(0);
const filterTypes = ref([]);
const filmsStore = useFilmsStore()
const userStore = useUserStore()
const ticketsStore = useTicketsStore()
const reservationStore = useReservationsStore()
const activeTab = ref('news')

const selectedTicket = ref('')
const goToTicketPage = () => {
  if (selectedTicket.value) {
    router.push('/ticket')
  }
}


onMounted(async () => {
  await filmsStore.getFilms();
  await filmsStore.getProjections();
  await reservationStore.getFilmsReservations()
  await userStore.getProviders();
  await ticketsStore.getTickets();
  await ticketsStore.getTicketsPrice();
});

const getDirectorName = (director_id) => {
  const director = userStore.providers.find(user => user.id === director_id)
  return director ? director.name : 'Directeur inconnu'
}

const averageNote = (notes) => {
  if (!notes || notes.length === 0) return 0;
  const sum = notes.reduce((acc, val) => acc + val, 0);
  return sum / notes.length;
};

const filteredProviders = computed(() => {
  return userStore.providers.filter(provider => {
    const matchName = provider.name.toLowerCase().includes(filterName.value.toLowerCase());
    const matchNote = averageNote(provider.note) >= filterNote.value; // ici, averageNote renvoie directement un nombre
    const matchType = filterTypes.value.length ? filterTypes.value.includes(provider.type) : true;
    const matchDroit = Number(provider.droit) === 1;
    return matchName && matchNote && matchType && matchDroit;
  });
});


const filteredNewFilms = computed(() => {
  const now = new Date() // aujd
  const oneMonthAgo = new Date() // il y a 1 mois
  oneMonthAgo.setMonth(now.getMonth() - 1)
  return filmsStore.films.filter(film => {
    const releaseDate = new Date(film.release_date)
    return releaseDate >= oneMonthAgo && releaseDate <= now
  })
})

const filteredFamousFilms = computed(() => { // récupere les 7 films les plus reservés du site

  const projectionCount = {}

  reservationStore.filmsReservations.forEach(r => {
    const pid = String(r.projectionId)

    projectionCount[pid] = (projectionCount[pid] || 0) + 1
  })
  const filmCount = {}

  filmsStore.projections.forEach(p => {
    const fid = String(p.filmId)
    const pid = String(p.id)

    filmCount[fid] = (filmCount[fid] || 0) + (projectionCount[pid] || 0)
  })
  const filmsWithCount = filmsStore.films.map(f => ({
    ...f,
    reservationsCount: filmCount[String(f.id)] || 0
  }))
  return filmsWithCount
      .sort((a, b) => b.reservationsCount - a.reservationsCount)
      .slice(0, 7)
})




</script>

<style scoped>
</style>







