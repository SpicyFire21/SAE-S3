<template>
  <div>
    <div class="flex justify-between items-center mb-6 border-b-2 border-yellow-500 pb-2">
      <h2 class="text-3xl font-bold text-gray-900">{{ t("AutographsList.1") }}</h2>
      <button
          class="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-900 transition"
          @click="addAutograph"
      >
        {{ t("AutographsList.2") }}
      </button>
    </div>

    <div
        v-for="aut in autographsWithUser"
        :key="aut.id"
        class="bg-white shadow-2xl rounded-3xl p-8 m-8 hover:shadow-yellow-400/30 transition-all duration-300 border border-yellow-200/20 backdrop-blur-md"
    >
      <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <h3 class="text-2xl font-bold text-gray-900 mb-2 md:mb-0">{{ aut.user.name }}</h3>
        <span class="text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
          {{ t("AutographsList.3") }}: {{ formatDuration(aut.duration) }}
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-4">
        <p><span class="font-semibold">{{ t("AutographsList.4") }}:</span> {{ formatDate(aut.beginDate) }}</p>
      </div>

      <div class="flex justify-end gap-3">
        <button
            class="px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-900 transition"
            @click="editAutograph(aut)"
        >
          {{ t("AutographsList.5") }}
        </button>
        <button
            class="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-900 transition"
            @click="$emit('delete-autograph', aut)"
        >
          {{ t("AutographsList.6") }}
        </button>
      </div>
    </div>

    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl w-[500px]">
        <h2 class="text-2xl font-bold mb-4">{{ t("AutographsList.5") }}</h2>
        <div class="space-y-3">
          <label class="font-semibold">{{ t("AutographsList.7") }}</label>
          <select v-model="autographStore.selectedAutograph.userId" class="border p-2 rounded w-full">
            <option v-for="provider in userStore.providers" :key="provider.id" :value="provider.id">{{ provider.name }}</option>
          </select>
          <div>
            <label class="font-semibold">{{ t("AutographsList.8") }}</label>
            <input type="datetime-local" v-model="autographStore.selectedAutograph.beginDate" class="border p-2 rounded w-full">
          </div>
          <div>
            <label class="font-semibold">{{ t("AutographsList.9") }}</label>
            <input type="number" v-model="autographStore.selectedAutograph.duration" class="border p-2 rounded w-full">
          </div>
        </div>
        <div class="flex justify-end gap-3 mt-6">
          <button class="px-4 py-2 bg-[var(--bleu)] text-white rounded hover:bg-[var(--bleu)]/90" @click="closeModal">{{ t("AutographsList.10") }}</button>
          <button class="px-4 py-2 bg-[var(--jaune)] text-white rounded hover:bg-[var(--jaune)]/80 text-white rounded" @click="saveEditAutograph">{{ t("AutographsList.11") }}</button>
        </div>
      </div>
    </div>

  <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl w-[500px]">
      <h2 class="text-2xl font-bold mb-4">{{ t("AutographsList.2") }}</h2>
      <div class="space-y-3">
        <label class="font-semibold">{{ t("AutographsList.7") }}</label>
        <select v-model="newAutographBase.userId" class="border p-2 rounded w-full">
          <option v-for="provider in userStore.providers" :key="provider.id" :value="provider.id">{{ provider.name }}</option>
        </select>
        <div>
          <label class="font-semibold">{{ t("AutographsList.8") }}</label>
          <input type="datetime-local" v-model="newAutographBase.beginDate" class="border p-2 rounded w-full">
        </div>
        <div>
          <label class="font-semibold">{{ t("AutographsList.9") }}</label>
          <input type="number" v-model="newAutographBase.duration" class="border p-2 rounded w-full">
        </div>
      </div>
      <div class="flex justify-end gap-3 mt-6">
        <button class="px-4 py-2 bg-[var(--bleu)] text-white rounded hover:bg-[var(--bleu)]/90" @click="closeModal">{{ t("AutographsList.10") }}</button>
        <button class="px-4 py-2 bg-[var(--jaune)] text-white rounded hover:bg-[var(--jaune)]/80 text-white rounded" @click="saveAddAutograph">{{ t("AutographsList.12") }}</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import {ref, computed} from "vue";
import {useAutographsStore, useUserStore} from "@/stores/index.js";
import {useI18n} from "vue-i18n";
const { t,locale } = useI18n()
const props = defineProps({
  standId: String
});

const newAutographBase = ref({
  standId: props.standId,
  userId: "",
  beginDate: "",
  duration: 0
})

const autographStore = useAutographsStore();
const userStore = useUserStore();
const showEditModal = ref(false);
const showAddModal = ref(false);

const autographsWithUser = computed(() =>
    autographStore.autographs
        .filter(a => a.standId === props.standId)
        .map(aut => {
          const user = userStore.getUserById(aut.userId);
          return { ...aut, user };
        })
);

const editAutograph = (autograph) => {
  autographStore.setSelectedAutograph({ ...autograph });
  showEditModal.value = true;
};

const addAutograph = () => {
  showAddModal.value = true;
}

const closeModal = () => {
  autographStore.setSelectedAutograph(null);
  showEditModal.value = false;
  showAddModal.value = false;
};

const saveEditAutograph = async () => {
  await autographStore.updateAutograph(autographStore.selectedAutograph);
  showEditModal.value = false;
};

async function saveAddAutograph() {
  if (newAutographBase.value.beginDate === "" || newAutographBase.value.userId === "" || newAutographBase.value.duration === 0) {
    showAddModal.value = false;
    return;
  }
  await autographStore.addAutograph(newAutographBase.value)
  showAddModal.value = false;
  newAutographBase.value.beginDate = ""
  newAutographBase.value.userId = ""
  newAutographBase.value.duration = 0
}

const formatDuration = (minutes) => {
  if (!minutes) return "0h 0min";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}min`;
};

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleString('fr-FR', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};
</script>
