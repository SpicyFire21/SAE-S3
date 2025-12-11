<template>
  <div class="w-screen flex justify-center items-center">
    <DataTable :items="adminStore.providerRequests" :headers="headers">
      <template #actions="{ item }">
        <button
            class="px-2 py-1 bg-[var(--vert)] text-[var(--noir)] rounded "
            @click="accept(item)"
        >
          {{ t("providerRequests.1") }}
        </button>
        <button
            class="px-2 py-1 bg-[var(--rouge)] text-[var(--noir)] rounded "
            @click="refuse(item)"
        >
          {{ t("providerRequests.2") }}
        </button>
      </template>
    </DataTable>


  </div>
</template>


<script setup>

import DataTable from "@/components/utils/DataTable.vue";
import {onMounted} from "vue";
import {useAdminStore, useUserStore} from "@/stores/index.js";
import {useI18n} from "vue-i18n";

const { t } = useI18n()


const adminStore = useAdminStore();
const userStore = useUserStore();
const headers = [
  "id","name", "email", "date"
]

async function accept(data){
  await userStore.registerProvider(data)
  await adminStore.removeProviderRequests(data);
}

async function refuse(data){
  await adminStore.deleteProviderRequests(data);
}

onMounted(async () => {
  await adminStore.getProvidersRequests();
})

</script>
