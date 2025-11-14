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

<div
    ref="mapContainer"
    class="relative overflow-hidden border shadow-md rounded-lg w-full h-[600px] mt-10 bg-white"
  >
    <svg
      ref="svgMap"
      viewBox="0 0 2048 1952"
      class="w-full h-full"
    >

      <!-- ========== HALLS (non-interactifs, pas de texte) ========== -->
      <rect class="non-interactive" id="hall1"
            x="1226" y="25" width="797" height="931" />
      <rect class="non-interactive" id="hall2"
            x="1226" y="989" width="797" height="931" />


      <!-- ========== CINÉMAS ========== -->
      <rect class="interactive cinema"
            x="25" y="32" width="481" height="620"
            @click="openPage('cinema-1')" />
      <text class="label"
            :x="25 + 481/2"
            :y="32 + 620/2"
            :font-size="getFontSize(620, 'cinema')">
        Cinéma 1
      </text>

      <rect class="interactive cinema"
            x="25" y="670" width="481" height="620"
            @click="openPage('cinema-2')" />
      <text class="label"
            :x="25 + 481/2"
            :y="670 + 620/2"
            :font-size="getFontSize(620, 'cinema')">
        Cinéma 2
      </text>

      <rect class="interactive cinema"
            x="25" y="1303" width="481" height="620"
            @click="openPage('cinema-3')" />
      <text class="label"
            :x="25 + 481/2"
            :y="1303 + 620/2"
            :font-size="getFontSize(620, 'cinema')">
        Cinéma 3
      </text>


      <!-- ========== SCÈNE ========== -->
      <rect class="interactive scene"
            x="1281" y="69" width="692" height="145"
            @click="openPage('scene')" />
      <text class="label"
            :x="1281 + 692/2"
            :y="69 + 145/2"
            :font-size="getFontSize(145, 'scene')">
        Scène
      </text>


      <!-- ========== GRANDS STANDS (deviennent "Stand") ========== -->
      <rect class="interactive standXL"
            x="886" y="348" width="65" height="164"
            @click="openPage('stand-big-1')" />
      <text class="label"
            :x="886 + 65/2"
            :y="348 + 164/2"
            :font-size="getFontSize(164, 'standXL')">
        Stand
      </text>

      <rect class="interactive standXL"
            x="781" y="348" width="65" height="164"
            @click="openPage('stand-big-2')" />
      <text class="label"
            :x="781 + 65/2"
            :y="348 + 164/2"
            :font-size="getFontSize(164, 'standXL')">
        Stand
      </text>

      <rect class="interactive standXL"
            x="886" y="1002" width="65" height="164"
            @click="openPage('stand-big-3')" />
      <text class="label"
            :x="886 + 65/2"
            :y="1002 + 164/2"
            :font-size="getFontSize(164, 'standXL')">
        Stand
      </text>

      <rect class="interactive standXL"
            x="781" y="1002" width="65" height="164"
            @click="openPage('stand-big-4')" />
      <text class="label"
            :x="781 + 65/2"
            :y="1002 + 164/2"
            :font-size="getFontSize(164, 'standXL')">
        Stand
      </text>

      <rect class="interactive standXL"
            x="1892" y="1230" width="65" height="164"
            @click="openPage('stand-big-5')" />
      <text class="label"
            :x="1892 + 65/2"
            :y="1230 + 164/2"
            :font-size="getFontSize(164, 'standXL')">
        Stand
      </text>

      <rect class="interactive standXL"
            x="1892" y="1427" width="65" height="164"
            @click="openPage('stand-big-6')" />
      <text class="label"
            :x="1892 + 65/2"
            :y="1427 + 164/2"
            :font-size="getFontSize(164, 'standXL')">
        Stand
      </text>


      <!-- ========== PETITS STANDS (Stand) ========== -->
      <!-- colonne centrale -->
      <rect class="interactive stand"
            x="781" y="202" width="65" height="92"
            @click="openPage('stand-1')" />
      <text class="label"
            :x="781 + 65/2"
            :y="202 + 92/2"
            :font-size="getFontSize(92, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="886" y="202" width="65" height="92"
            @click="openPage('stand-2')" />
      <text class="label"
            :x="886 + 65/2"
            :y="202 + 92/2"
            :font-size="getFontSize(92, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="781" y="563" width="65" height="92"
            @click="openPage('stand-3')" />
      <text class="label"
            :x="781 + 65/2"
            :y="563 + 92/2"
            :font-size="getFontSize(92, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="886" y="563" width="65" height="92"
            @click="openPage('stand-4')" />
      <text class="label"
            :x="886 + 65/2"
            :y="563 + 92/2"
            :font-size="getFontSize(92, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="781" y="860" width="65" height="92"
            @click="openPage('stand-10')" />
      <text class="label"
            :x="781 + 65/2"
            :y="860 + 92/2"
            :font-size="getFontSize(92, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="886" y="860" width="65" height="92"
            @click="openPage('stand-11')" />
      <text class="label"
            :x="886 + 65/2"
            :y="860 + 92/2"
            :font-size="getFontSize(92, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="787" y="1220" width="65" height="92"
            @click="openPage('stand-17')" />
      <text class="label"
            :x="787 + 65/2"
            :y="1220 + 92/2"
            :font-size="getFontSize(92, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="893" y="1221" width="65" height="92"
            @click="openPage('stand-18')" />
      <text class="label"
            :x="893 + 65/2"
            :y="1221 + 92/2"
            :font-size="getFontSize(92, 'stand')">
        Stand
      </text>


      <!-- stands dans le hall (haut) -->
      <rect class="interactive stand"
            x="1729" y="842" width="92" height="65"
            @click="openPage('stand-5')" />
      <text class="label"
            :x="1729 + 92/2"
            :y="842 + 65/2"
            :font-size="getFontSize(65, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="1595" y="842" width="92" height="65"
            @click="openPage('stand-6')" />
      <text class="label"
            :x="1595 + 92/2"
            :y="842 + 65/2"
            :font-size="getFontSize(65, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="1860" y="842" width="92" height="65"
            @click="openPage('stand-7')" />
      <text class="label"
            :x="1860 + 92/2"
            :y="842 + 65/2"
            :font-size="getFontSize(65, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="1458" y="842" width="92" height="65"
            @click="openPage('stand-8')" />
      <text class="label"
            :x="1458 + 92/2"
            :y="842 + 65/2"
            :font-size="getFontSize(65, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="1311" y="842" width="92" height="65"
            @click="openPage('stand-9')" />
      <text class="label"
            :x="1311 + 92/2"
            :y="842 + 65/2"
            :font-size="getFontSize(65, 'stand')">
        Stand
      </text>


      <!-- stands median -->
      <rect class="interactive stand"
            x="1720" y="1038" width="92" height="65"
            @click="openPage('stand-12')" />
      <text class="label"
            :x="1720 + 92/2"
            :y="1038 + 65/2"
            :font-size="getFontSize(65, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="1586" y="1038" width="92" height="65"
            @click="openPage('stand-13')" />
      <text class="label"
            :x="1586 + 92/2"
            :y="1038 + 65/2"
            :font-size="getFontSize(65, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="1851" y="1038" width="92" height="65"
            @click="openPage('stand-14')" />
      <text class="label"
            :x="1851 + 92/2"
            :y="1038 + 65/2"
            :font-size="getFontSize(65, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="1449" y="1038" width="92" height="65"
            @click="openPage('stand-15')" />
      <text class="label"
            :x="1449 + 92/2"
            :y="1038 + 65/2"
            :font-size="getFontSize(65, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="1302" y="1038" width="92" height="65"
            @click="openPage('stand-16')" />
      <text class="label"
            :x="1302 + 92/2"
            :y="1038 + 65/2"
            :font-size="getFontSize(65, 'stand')">
        Stand
      </text>


      <!-- stands bas du hall -->
      <rect class="interactive stand"
            x="1724" y="1784" width="92" height="65"
            @click="openPage('stand-19')" />
      <text class="label"
            :x="1724 + 92/2"
            :y="1784 + 65/2"
            :font-size="getFontSize(65, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="1591" y="1784" width="92" height="65"
            @click="openPage('stand-20')" />
      <text class="label"
            :x="1591 + 92/2"
            :y="1784 + 65/2"
            :font-size="getFontSize(65, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="1855" y="1784" width="92" height="65"
            @click="openPage('stand-21')" />
      <text class="label"
            :x="1855 + 92/2"
            :y="1784 + 65/2"
            :font-size="getFontSize(65, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="1453" y="1784" width="92" height="65"
            @click="openPage('stand-22')" />
      <text class="label"
            :x="1453 + 92/2"
            :y="1784 + 65/2"
            :font-size="getFontSize(65, 'stand')">
        Stand
      </text>

      <rect class="interactive stand"
            x="1306" y="1784" width="92" height="65"
            @click="openPage('stand-23')" />
      <text class="label"
            :x="1306 + 92/2"
            :y="1784 + 65/2"
            :font-size="getFontSize(65, 'stand')">
        Stand
      </text>


      <!-- Entrée (pas de texte) -->
      <rect class="non-interactive"
            id="entrance1"
            x="620" y="1586" width="502" height="37" />

    </svg>
  </div>






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






<script>
import panzoom from "panzoom";

export default {
  mounted() {
    panzoom(this.$refs.svgMap, {
      smoothScroll: false,
      zoomSpeed: 0.065,
      maxZoom: 3,
      minZoom: 0.5,
    });
  },

  methods: {
    openPage(name) {
      console.log("Zone cliquée :", name);
    },

    getFontSize(h, type) {
      switch (type) {

        case 'cinema':
          return h * 0.12; // Gros texte

        case 'scene':
          return h * 0.40; // Très visible

        case 'standXL':
          return h * 0.22; // ex-grand stand

        case 'stand':
          return h * 0.28; // petits stands

        default:
          return h * 0.20;
      }
    }
  }
};
</script>

<style scoped>
.label {
  fill: black;
  text-anchor: middle;
  dominant-baseline: middle;
  pointer-events: none;
  user-select: none;
  font-weight: 700;
}

/* Non-interactifs */
.non-interactive {
  fill: #e5e5e5;
  stroke: #b3b3b3;
  stroke-width: 2;
}

/* Interactifs */
.interactive {
  stroke: #000000;
  stroke-width: 2;
  cursor: pointer;
  transition: 0.2s;
}

.interactive:hover {
  opacity: 0.50;
  stroke-width: 4;
}

/* Couleurs */
.cinema { fill: #c0392b; }
.standXL { fill: #3ab0e7; }
.stand { fill: #2ecc71; }
.scene { fill: #f5a6c5; }

</style>