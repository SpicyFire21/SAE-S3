<template>
  <div v-if="stand" class="min-h-screen bg-white">
    <div class="pt-24 pb-10">
      <div class="max-w-5xl mx-auto px-8">

        <div v-if="!userStore.currentUser"
             class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-red-200 bg-red-50 text-red-400 text-sm font-medium">
          🔔 {{ t('StandDetails.1') }}
        </div>

        <p class="text-yellow-400 text-xs font-semibold tracking-[0.25em] uppercase mb-2">{{ typeStand?.type }}</p>
        <h1 class="text-5xl font-black text-gray-900 tracking-tight leading-none mb-3">{{ stand?.name }}</h1>
        <p class="text-gray-400 text-sm font-medium">
          {{ t('StandDetails.3') }} —
          <span class="text-gray-600">{{ user?.name || t('StandDetails.4') }}</span>
        </p>

        <div class="w-full h-px bg-gray-100 my-10"></div>

        <component :is="componentMap[stand.type_id]" :stand="stand" />

      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { useRoute } from "vue-router";
import { useStandsStore } from "@/stores/modules/stands.js";
import CinemaStandDetails from "@/components/StandDetails/CinemaStandDetails.vue";
import AutographStandDetails from "@/components/StandDetails/AutographStandDetails.vue";
import {useUserStore} from "@/stores/index.js";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
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
  typeStand.value = await standsStore.getStandTypeById(stand.value.type_id);
  user.value = await userStore.getUserById(stand.value.owner_id);
})

const componentMap = {
  1: CinemaStandDetails,
  2: AutographStandDetails,
};
</script>