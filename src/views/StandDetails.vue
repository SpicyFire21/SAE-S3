<template>
  <div v-if="stand">
    <div class="pt-30">
      <div class="flex flex-row justify-center items-center text-center text-[21px]">
        <div class="flex flex-col gap-2">
          <h1
              v-if="!userStore.currentUser"
              class="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500/40 bg-red-500/10 text-red-600 font-semibold text-lg shadow-sm backdrop-blur-sm animate-pulse"
          >
            🔔 {{ t('StandDetails.1') }} 🔔
          </h1>
          <h1 class="text-[var(--jaune)] font-bold">
            {{ t('StandDetails.2') }}: {{ stand?.name }}
          </h1>
          <h1>Type: {{ typeStand?.type }}</h1>
          <h1>{{ t('StandDetails.3') }}: {{ user?.name || t('StandDetails.4')  }}</h1>
<!--          si pas de nom == aucun propriétaire-->
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
import {computed, onMounted, ref} from "vue";
import { useRoute } from "vue-router";
import { useStandsStore } from "@/stores/modules/stands.js";

import CinemaStandDetails from "@/components/StandDetails/CinemaStandDetails.vue";
import AutographStandDetails from "@/components/StandDetails/AutographStandDetails.vue";
import {useUserStore} from "@/stores/index.js";
import {useI18n} from "vue-i18n";

const {t, tm} = useI18n()
const standsStore = useStandsStore();
const userStore = useUserStore();
const route = useRoute();
const id = route.params.id;

const stand = ref(null)
const typeStand = ref(null)
const user = ref(null)

onMounted(async () => {
  await standsStore.init();
  stand.value = await standsStore.getStandById(id);
  typeStand.value = await standsStore.getStandTypeById(stand.value.type);
  user.value = await userStore.getUserById(stand.value.owner);
})

const componentMap = { // faut bien faire attention a se referer aux ids dans data
  1: CinemaStandDetails,
  2: AutographStandDetails,
};


</script>
