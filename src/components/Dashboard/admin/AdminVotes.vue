<template>
  <!-- GESTION DES VOTES -->
  <div class="pl-64 pt-10 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-900">{{t("AdminVotes.1")}}</h1>

    <!-- Toggle votes -->
    <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-3">{{t("AdminVotes.2")}}</h2>

      <button
          v-if="votesStore.votingOpen"
          @click="disableVotes"
          class="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-800"
      >
        {{t("AdminVotes.3")}}
      </button>

      <button
          v-else
          @click="enableVotes"
          class="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-800"
      >
        {{t("AdminVotes.4")}}
      </button>

      <p class="mt-3 text-sm text-gray-600">
        {{t("AdminVotes.5")}} :
        <span class="font-bold">{{ votesStore.votingOpen ? "🟢 Ouverts" : "🔴 Fermés" }}</span>
      </p>
    </div>

    <!-- Reset votes -->
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <h2 class="text-xl font-semibold mb-3">{{t("AdminVotes.6")}}</h2>

      <button
          @click="resetVotes"
          class="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-black"
      >
        {{t("AdminVotes.7")}}
      </button>

      <p v-if="errorMessage" class="mt-3 text-red-600 text-sm font-medium">
        {{ errorMessage }}
      </p>

      <p v-if="successMessage" class="mt-3 text-green-600 text-sm font-medium">
        {{ successMessage }}
      </p>
    </div>
  </div>
  <!-- GESTION DES CATÉGORIES -->
  <div class="bg-white rounded-2xl shadow-lg p-6 mt-6">
    <h2 class="text-xl font-semibold mb-4">{{t("AdminVotes.8")}}</h2>

    <!-- Liste des catégories existantes -->
    <div class="mb-4">
      <div
          v-for="cat in votesStore.categories"
          :key="cat.id"
          class="flex justify-between items-center border-b border-gray-200 py-2"
      >
        <span class="text-gray-900">{{ cat.category_name }}</span>

        <button
            @click="deleteCategory(cat.id)"
            class="text-sm text-red-600 font-medium hover:text-red-800"
        >
          {{t("AdminVotes.9")}}
        </button>
      </div>

      <p v-if="!votesStore.categories.length" class="text-gray-500 text-sm mt-2">
        {{t("AdminVotes.10")}}
      </p>
    </div>

    <!-- Ajout d'une catégorie -->
    <div class="flex gap-3">
      <input
          v-model="newCategory"
          :placeholder="t('AdminVotes.11')"
          class="border border-gray-300 rounded-lg px-3 py-2 w-full text-sm"
      />

      <button
          @click="addCategory"
          class="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black"
      >
        {{t("AdminVotes.12")}}
      </button>
    </div>

    <p v-if="categoryMessage" class="text-sm mt-3"
       :class="categoryError ? 'text-red-600' : 'text-green-600'"
    >
      {{ categoryMessage }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useVotesStore } from '@/stores/modules/votes.js'
import {useI18n} from "vue-i18n";

const { t,locale } = useI18n()
const votesStore = useVotesStore()

const errorMessage = ref('')
const successMessage = ref('')

const newCategory = ref('')
const categoryMessage = ref('')
const categoryError = ref(false)

onMounted(async () => {
  await votesStore.getCategories()
  await votesStore.getVotes()
  await votesStore.getScores()
})

// Actions
const enableVotes = () => {
  votesStore.toggleVoting(true)
  successMessage.value = "Les votes sont maintenant ouverts"
  errorMessage.value = ''
}

const disableVotes = () => {
  votesStore.toggleVoting(false)
  successMessage.value = "Les votes ont été fermés"
  errorMessage.value = ''
}

const resetVotes = async () => {
  const res = await votesStore.resetAllVotesAndScores()

  if (res.error === 0) {
    successMessage.value = "Les votes et scores ont bien été réinitialisés"
    errorMessage.value = ''
  } else {
    errorMessage.value = res.data || "Impossible de reset les votes"
    successMessage.value = ''
  }
}

// Ajoute une catégorie
const addCategory = async () => {
  if (!newCategory.value.trim()) {
    categoryMessage.value = "Veuillez entrer un nom valide"
    categoryError.value = true
    return
  }

  const res = await votesStore.addCategory({ category_name: newCategory.value })

  if (res?.error === 0) {
    categoryMessage.value = `Catégorie "${res.data.category_name}" ajoutée`
    categoryError.value = false
    newCategory.value = ''

    // Recharge les catégories + scores pour mettre à jour le classement
    await votesStore.getCategories()
    await votesStore.getScores()
  } else {
    categoryMessage.value = res?.data || "Impossible d'ajouter la catégorie"
    categoryError.value = true
  }
}

// Supprime une catégorie
const deleteCategory = async (id) => {
  const res = await votesStore.deleteCategory(id)

  if (res?.error === 0) {
    categoryMessage.value = `Catégorie "${res.data.category_name}" supprimée`
    categoryError.value = false

    // Recharge les catégories + scores + classement UI
    await votesStore.getCategories()
    await votesStore.getScores()
  } else {
    categoryMessage.value = res?.data || "Impossible de supprimer la catégorie"
    categoryError.value = true
  }
}
</script>
