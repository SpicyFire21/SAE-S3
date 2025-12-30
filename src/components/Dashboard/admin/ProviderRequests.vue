<template>
  <div class="min-h-screen pt-24 flex justify-center pl-64">
    <div class="max-w-6xl w-full px-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">Demandes de prestataires</h1>
      <DataTable
          :items="adminStore.providerRequests"
          :headers="headers"
          class="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <template #actions="{ item }">
          <div class="flex gap-4 mt-2">
            <button
                class="flex-1 px-4 py-2 bg-green-400 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                @click="accept(item)"
            >
              {{ t("providerRequests.1") }}
            </button>
            <button
                class="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-900 transition"
                @click="refuse(item)"
            >
              {{ t("providerRequests.2") }}
            </button>
          </div>
        </template>
      </DataTable>
      <h1 class="text-4xl font-bold text-gray-900 mt-16 mb-6 pl-8">Demandes de réservations de stands</h1>
      <div class="bg-white w-full rounded-2xl shadow-lg p-8 space-y-4">
        <div v-for="sr in standStore.standReservationsRequests" :key="sr.id"
             class="border-b border-gray-200 pb-4 last:border-b-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

          <div class="flex-1" v-if="sr.status === 'pending'">
            <h2 class="text-lg font-semibold text-gray-900 mb-1">{{ userStore.getUserById(sr.userId).name }}</h2>
            <p class="text-gray-700 mb-1">Stand: <span
                class="font-medium">{{ standStore.getStandByIdForAdmin(sr.standId).name }}</span></p>
            <p class="text-gray-600 text-sm">Date: {{ formatDate(sr.requestDate) }}</p>
            <p class="text-gray-600 text-sm">Status:
              <span :class="{
          'text-green-600 font-semibold': sr.status === 'accepted',
          'text-red-600 font-semibold': sr.status === 'refused',
          'text-yellow-700 font-semibold': sr.status === 'pending'
        }">{{ sr.status }}</span>
            </p>


          <div class="flex gap-3 mt-2 md:mt-0">
            <button
                class="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                @click="acceptReservation(sr)"
            >
              Accepter
            </button>
            <button
                class="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-900 transition"
                @click="refuseReservation(sr)"
            >
              Refuser
            </button>
          </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script setup>

import DataTable from "@/components/utils/DataTable.vue";
import {computed, onMounted} from "vue";
import {useAdminStore, useUserStore, useStandsStore} from "@/stores/index.js";
import {useI18n} from "vue-i18n";

const {t} = useI18n()


const adminStore = useAdminStore();
const userStore = useUserStore();
const standStore = useStandsStore();
const headers = [
  "id", "name", "email", "date"
]

async function accept(data) {
  await userStore.registerProvider(data)
  await adminStore.removeProviderRequests(data);
}

async function refuse(data) {
  await adminStore.deleteProviderRequests(data);
}

async function acceptReservation(sr) {
  const stand = standStore.getStandByIdForAdmin(sr.standId)
  stand.owner = sr.userId;
  sr.status = "accepted";
  console.log("AAAA:" + JSON.stringify(sr))
  console.log("STAND:" + JSON.stringify(stand))
}


async function refuseReservation(sr) {
  sr.status = "refused";
}



onMounted(async () => {
  await standStore.getStands();
  await userStore.getUsers();
  await standStore.getStandsTypes();
  await adminStore.getProvidersRequests();
  await standStore.getStandsReservationsRequests();
})

const formatDate = (date) =>
    new Date(date).toLocaleString('fr-FR', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })

</script>
