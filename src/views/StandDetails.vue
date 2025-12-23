<template>
  <div v-if="stand" class="">
    <div class="pt-20">
      <div class="flex flex-row justify-center align-center text-left">
        <div class="flex flex-col justify-left align-left">
        </div>
        <div class="flex flex-col justify-right align-right ml-5 gap-2">
          <h1 class="text-[var(--jaune)] font-bold">Nom du stand: {{ stand.name }}</h1>
          <h1>Type: {{ stand.typeName }}</h1>
          <h1>Propriétaire: {{ stand.ownerName }}</h1>
          <h2>Contenu: a suivre au prochaine episode #adamlapomme #pommier</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";
import {useStandsStore} from "@/stores/modules/stands.js";

const standsStore = useStandsStore();
const route = useRoute();
const id = route.params.id;

onMounted(async () => {
  if (!standsStore.stands.length) {
    await standsStore.getStands();
  }
});

// const getStandImage = (fileName) =>
//     new URL(`../assets/img/${fileName}`, import.meta.url).href;


const stand = computed(() =>
    standsStore.enrichedStands.find(f => f.idstand === id)
); // il ne faut pas oublier que ownerName et typeName ne font pas partie des datas, cest que de l'affichage



</script>

<style scoped>
</style>
