<template>
  <div>

    <div class="flex items-center gap-4 mb-8">
      <h2 class="text-gray-900 text-xl font-bold tracking-tight whitespace-nowrap">{{ t("AutographStandDetails.1") }}</h2>
      <div class="h-px flex-1 bg-gray-100"></div>
      <span class="text-gray-400 text-xs font-semibold tracking-widest uppercase">{{ autographs.length }} invités</span>
    </div>

    <div v-if="autographs.length" class="flex flex-col gap-3">
      <div
          v-for="autograph in autographs"
          :key="autograph.id"
          class="rounded-2xl border border-gray-100 bg-gray-50 p-5 hover:border-gray-200"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4 flex-1 min-w-0">
            <img :src="getUserImage(autograph.userProfilePicture)" alt="Utilisateur"
                 class="w-14 h-14 rounded-full object-cover shrink-0">
            <div>
              <p class="text-gray-900 font-bold text-base leading-tight mb-1">{{ autograph.userName }}</p>
              <p class="text-gray-400 text-sm">{{ t("AutographStandDetails.3") }} : {{ formatDate(autograph.begin_date) }}</p>
              <p class="text-gray-400 text-sm">{{ t("AutographStandDetails.4") }} : {{ formatDate(new Date(new Date(autograph.begin_date).getTime() + autograph.duration * 60000)) }}</p>
            </div>
          </div>
          <button @click="openModal(autograph)"
                  class="shrink-0 bg-yellow-400 hover:bg-yellow-300 text-gray-900 text-sm font-bold px-5 py-2.5 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                  :disabled="!userStore.currentUser || userStore.currentUser.droit === '1'">
            {{ t("AutographStandDetails.2") }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center mt-6 text-gray-400 text-sm">
      {{ t("AutographStandDetails.5") }}
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div class="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl relative border border-gray-100">

        <button @click="closeModal" class="absolute top-5 right-5 text-gray-300 hover:text-gray-600 text-base leading-none">✕</button>

        <p class="text-yellow-400 text-xs font-semibold tracking-widest uppercase mb-1">{{ t("AutographStandDetails.6") }}</p>
        <h2 class="text-gray-900 text-2xl font-black tracking-tight mb-1">{{ autographStore.selectedAutograph.userName }}</h2>
        <p class="text-gray-400 text-sm mb-7">{{ t("AutographStandDetails.7") }}</p>

        <div class="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-6 text-sm text-gray-700">
          <p class="font-medium">{{ formatDate(autographStore.selectedAutograph.begin_date) }}</p>
          <p class="text-gray-400 mt-0.5">{{ t("AutographStandDetails.8") }} {{ formatDuration(autographStore.selectedAutograph.duration) }}</p>
        </div>

        <button
            @click="confirmAutographReservation"
            class="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3.5 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            :disabled="!autographStore.selectedAutograph || hasAlreadyReservedAutograph"
        >
          Confirmer la réservation
        </button>

        <p v-if="hasAlreadyReservedAutograph" class="text-red-400 text-xs text-center mt-3">
          {{ t("AutographStandDetails.9") }}
        </p>

      </div>
    </div>

    <div v-if="showSuccessPopup"
         class="fixed top-24 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-6 py-3.5 rounded-2xl shadow-xl z-50">
      <span class="text-yellow-400">✓</span>
      {{ t("AutographStandDetails.10") }}
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAutographsStore } from '@/stores/modules/autographs.js'
import {useReservationsStore, useStandsStore, useUserStore} from '@/stores/index.js'
import {useI18n} from "vue-i18n";
const { t } = useI18n()
const autographStore = useAutographsStore()
const userStore = useUserStore()
const reservationStore = useReservationsStore();
const standStore = useStandsStore();

const props = defineProps({ stand: { type: Object, required: true } })

const isModalOpen = ref(false)
const showSuccessPopup = ref(false);

const openModal = (autograph) => {
  autographStore.selectedAutograph = autograph; isModalOpen.value = true
}
const closeModal = () => {
  autographStore.selectedAutograph = null; isModalOpen.value = false
}

onMounted(async () => {
  await autographStore.getAutographsByStandId(props.stand.id)
  await standStore.getStands();
  await userStore.getUsers()
  await reservationStore.getReservations();
  await reservationStore.getAutographsReservations()
})

const hasAlreadyReservedAutograph = computed(() => {
  if (!autographStore.selectedAutograph || !userStore.currentUser) return false;
  return reservationStore.reservations.some(r =>
      r.user_id === userStore.currentUser.id &&
      r.type === "autograph" &&
      reservationStore.autographsReservations.some(ar =>
          ar.reservation_id === r.id &&
          ar.autograph_id === autographStore.selectedAutograph.id
      )
  );
});

const autographs = computed(() =>
    autographStore.autographs.map(a => {
      const user = userStore.getUserById(a.user_id)
      return {
        ...a,
        userName: user?.name || 'Utilisateur inconnu',
        userProfilePicture: user?.nom_photo || 'default.png'
      }
    })
)

const confirmAutographReservation = async () => {
  await reservationStore.addAutographReservation({
    iduser: userStore.currentUser.id,
    type: "autograph",
    date: autographStore.selectedAutograph.begin_date,
    idautograph: autographStore.selectedAutograph.id,
    idstand: props.stand.id
  });
  closeModal();
  showSuccessPopup.value = true;
  setTimeout(() => { showSuccessPopup.value = false; }, 2250);
}

const getUserImage = (fileName) => {
  try { return new URL(`../../assets/img/${fileName}`, import.meta.url).href }
  catch { return new URL('../../assets/img/default.png', import.meta.url).href }
}

const formatDate = (date) =>
    new Date(date).toLocaleString('fr-FR', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })

const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h > 0 ? h + 'h ' : ''}${m}min`
}
</script>