<template>
  <div class="min-h-screen pt-24 flex justify-center pl-64">
    <div class="max-w-6xl w-full px-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">{{ t("providerRequests.3") }}</h1>
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



onMounted(async () => {
  await standStore.getStands();
  await userStore.getUsers();
  await standStore.getStandsTypes();
  await adminStore.getProvidersRequests();
})


</script>
