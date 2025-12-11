<template>
  <div class="p-6 w-full">
    <h1 class="text-2xl font-bold mb-4">Gestion des Goodies</h1>

    <!-- Activer/désactiver la vente -->
    <div class="mb-6 flex items-center gap-4">
      <label class="font-semibold">Vente de goodies active :</label>
      <input type="checkbox" v-model="sellingActive" @change="toggleSelling" />
    </div>

    <!-- Formulaire création -->
    <div class="mb-6 border p-4 rounded bg-white shadow" :class="{ 'opacity-50 pointer-events-none': !sellingActive }">
      <h2 class="text-xl font-semibold mb-2">Ajouter un Goodie</h2>
      <div class="flex flex-col md:flex-row gap-4 items-start">

        <label for="name">Nom</label><input
          id="name"
          v-model="newGoodieBase.name"
          type="text"
          placeholder="Nom du goodie"
          class="border p-2 rounded flex-1"
      />
        <label for="price">Prix</label><input
          id="price"
          v-model.number="newGoodieBase.price"
          type="number"
          placeholder="Prix"
          class="border p-2 rounded w-32"
      />
        <label for="quantity">Quantité</label><input
          id="quantity"
          v-model.number="newGoodieBase.quantity"
          type="number"
          placeholder="Quantité"
          class="border p-2 rounded w-32"
      />




        <button
            @click="addGoodieVariants()"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter
        </button>




      </div>
      <div class="flex-col">
        <label class="font-semibold">Tailles :</label>
        <div class="flex  gap-2">
          <label v-for="s in providerStore.goodiesSizes" :key="s.id" class="flex items-center gap-1">
            <input
                type="checkbox"
                :value="s.id"
                v-model="selectedSizes"
            />
            {{ s.label }}
          </label>
        </div>
        <label class="font-semibold">Couleurs :</label>
        <div class="flex gap-2">
          <label v-for="c in providerStore.goodiesColors" :key="c.id" class="flex items-center gap-1">
            <input
                type="checkbox"
                :value="c.id"
                v-model="selectedColors"
            />
            {{ c.label }}
          </label>
        </div>
      </div>



    </div>

    <!-- Table des goodies -->
    <div class="overflow-x-auto bg-white rounded shadow">
      <DataTable :headers="headers" :items="displayGoodies">

        <template #actions="{ item }">
          <button
              class="px-2 py-1 bg-[var(--vert)] text-[var(--noir)] rounded "

          >
            {{ t("GoodiesBoard.1") }}
          </button>
          <button
              class="px-2 py-1 bg-[var(--rouge)] text-[var(--noir)] rounded "
          >
            {{ t("GoodiesBoard.2") }}
          </button>
        </template>

      </DataTable>
    </div>

    <p v-if="!sellingActive" class="mt-2 text-red-600 font-semibold">
      La vente de goodies est désactivée.
    </p>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import { v4 as uuidv4 } from 'uuid'
import {useProviderStore, useUserStore} from "@/stores/index.js";
import DataTable from "@/components/utils/DataTable.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n()
const providerStore = useProviderStore()
const userStore = useUserStore()

const sellingActive = ref(true)

const headers = [
  "id","name", "price","quantity","size","color", "date"
]

const selectedSizes = ref([])
const selectedColors = ref([])

const newGoodieBase = ref({
  user_id: userStore.currentUser.id,
  service_id: "1",
  name: "",
  price: 0,
  quantity: 0,
  date: new Date().toISOString().split("T")[0]
})

const displayGoodies = computed(() => {
  return providerStore.goodies.map(g => ({
    ...g,
    size: providerStore.getSize(g.goodies_size_id)?.label || "—",
    color: providerStore.getColor(g.goodies_color_id)?.label || "—"
  }))
})

function addGoodieVariants() {
  console.log(newGoodieBase.value)
  if (!sellingActive.value) return
  console.log("1")
  if (!newGoodieBase.value.name || newGoodieBase.value.price <= 0) return
  console.log("2")
  if (selectedSizes.value.length === 0) return
  console.log("3")
  if (selectedColors.value.length === 0) return
  console.log("4")

  // produit cartésien tailles × couleurs
  selectedSizes.value.forEach(sizeId => {
    selectedColors.value.forEach(colorId => {

      let data = {
        id: uuidv4(),
        ...newGoodieBase.value,
        goodies_size_id: sizeId,
        goodies_color_id: colorId
      }
      providerStore.addGoodie(data)


    })
  })

  selectedSizes.value = []
  selectedColors.value = []
  newGoodieBase.value.name = ""
  newGoodieBase.value.price = 0
  console.log("créé")
}


function removeGoodie(id) {
  if (!sellingActive.value) return
  goodies.value = goodies.value.filter(g => g.id !== id)
}

function toggleSelling() {
  // ici tu peux appeler l'API pour sauvegarder l'état global
  console.log('Vente active:', sellingActive.value)
}


onMounted(async()=>{
  await providerStore.getGoodiesByProviderId(userStore.currentUser.id)

  await providerStore.getGoodiesSizes()
  await providerStore.getGoodiesColors()


})

</script>
