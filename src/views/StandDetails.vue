<template>
  <div v-if="stand">
    <div class="pt-30">
      <div class="flex flex-row justify-center items-center text-center text-[21px]">

        <div class="flex flex-col gap-2">
          <h1 class="text-[var(--jaune)] font-bold">
            Nom du stand: {{ stand.name }}
          </h1>
          <h1>Type: {{ stand.typeName }}</h1>
          <h1>Propriétaire: {{ stand.ownerName }}</h1>
        </div>
      </div>
      <component
          :is="componentMap[stand.type]"
          :stand="stand"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStandsStore } from "@/stores/modules/stands.js";

import CinemaStandDetails from "@/components/StandDetails/CinemaStandDetails.vue";
import AutographStandDetails from "@/components/StandDetails/AutographStandDetails.vue";


const standsStore = useStandsStore();
const route = useRoute();
const id = route.params.id;

onMounted(async () => {
  await standsStore.init();
});

const componentMap = { // faut bien faire attention a se referer aux ids dans data
  1: CinemaStandDetails,
  2: AutographStandDetails,
};

const stand = computed(() =>
    standsStore.enrichedStands.find(f => f.idstand === id)
);
</script>
