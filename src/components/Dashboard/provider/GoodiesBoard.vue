<template>
  <div class="pl-0 sm:pl-4 md:pl-64 mx-auto min-h-screen p-4 sm:p-8">
    <h1 class="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-gray-900 tracking-wide">
      {{ t("GoodiesBoard.9") }}
    </h1>

    <!-- Activer/désactiver la vente -->
    <div class="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
      <label class="font-semibold text-gray-800 text-lg">{{ t("GoodiesBoard.11") }}</label>
      <input type="checkbox" v-model="sellingActive" @change="toggleSelling"
             class="w-6 h-6 accent-yellow-400 border-gray-300 rounded"/>
    </div>

    <!-- Formulaire création -->
    <div class="flex flex-col md:flex-row gap-6 md:gap-8 flex-wrap">

      <!-- Goodie Form -->
      <div class="flex-1 mb-6 md:mb-8 p-6 rounded-2xl bg-white shadow-xl"
           :class="{ 'opacity-50 pointer-events-none': !sellingActive }">
        <h2 class="text-xl sm:text-2xl font-bold mb-4 text-gray-900">{{ t("GoodiesBoard.8") }}</h2>

        <div class="flex flex-col sm:flex-row flex-wrap gap-4 items-start">
          <div class="flex-1 min-w-[150px]">
            <label for="name" class="text-gray-700 font-medium">{{ t("GoodiesBoard.7") }}</label>
            <input
                id="name"
                v-model="newGoodieBase.name"
                type="text"
                placeholder="Nom du goodie"
                class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div class="min-w-[120px]">
            <label for="price" class="text-gray-700 font-medium">{{ t("GoodiesBoard.6") }}</label>
            <input
                id="price"
                v-model.number="newGoodieBase.price"
                type="number"
                placeholder="Prix"
                class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div class="min-w-[120px]">
            <label for="quantity" class="text-gray-700 font-medium">{{ t("GoodiesBoard.5") }}</label>
            <input
                id="quantity"
                v-model.number="newGoodieBase.quantity"
                type="number"
                placeholder="Quantité"
                class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
              @click="addGoodieVariants()"
              class="bg-yellow-400 text-white px-4 sm:px-6 py-3 rounded-xl hover:bg-yellow-500 transition-all shadow-md font-semibold mt-4 sm:mt-0"
          >
            {{ t("GoodiesBoard.4") }}
          </button>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4">
          <div class="flex-1">
            <label class="font-semibold text-gray-800">{{ t("GoodiesBoard.10") }}</label>
            <div class="flex gap-2 flex-wrap mt-2">
              <label v-for="s in goodiesStore.sizes" :key="s.id" class="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" :value="s.id" v-model="selectedSizes" class="accent-yellow-400 w-5 h-5"/>
                <span class="text-gray-700">{{ s.label }}</span>
              </label>
            </div>
          </div>

          <div class="flex-1">
            <label class="font-semibold text-gray-800">{{ t("GoodiesBoard.3") }}</label>
            <div class="flex gap-2 flex-wrap mt-2">
              <label v-for="c in goodiesStore.colors" :key="c.id" class="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" :value="c.id" v-model="selectedColors" class="accent-yellow-400 w-5 h-5"/>
                <span class="text-gray-700">{{ c.label }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Ajouter couleur -->
      <div class="mb-6 md:mb-8 p-6 rounded-2xl bg-white shadow-xl flex-1"
           :class="{ 'opacity-50 pointer-events-none': !sellingActive }">
        <h2 class="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Ajouter une couleur</h2>
        <input
            v-model="newColor.label"
            type="text"
            placeholder="Nom du goodie"
            class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
        />
        <button
            @click="addColor()"
            class="bg-yellow-400 text-white px-4 sm:px-6 py-3 rounded-xl hover:bg-yellow-500 transition-all shadow-md font-semibold w-full"
        >
          {{ t("GoodiesBoard.4") }}
        </button>
      </div>

      <!-- Ajouter taille -->
      <div class="mb-6 md:mb-8 p-6 rounded-2xl bg-white shadow-xl flex-1"
           :class="{ 'opacity-50 pointer-events-none': !sellingActive }">
        <h2 class="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Ajouter une taille</h2>
        <input
            v-model="newSize.label"
            type="text"
            placeholder="Nom du goodie"
            class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
        />
        <button
            @click="addSize()"
            class="bg-yellow-400 text-white px-4 sm:px-6 py-3 rounded-xl hover:bg-yellow-500 transition-all shadow-md font-semibold w-full"
        >
          {{ t("GoodiesBoard.4") }}
        </button>
      </div>
    </div>

    <!-- Modifier Goodie -->
    <div v-if="editingGoodie" class="mb-6 p-6 rounded-2xl bg-gray-50 shadow-xl">
      <h2 class="text-xl sm:text-2xl font-bold mb-4 text-gray-900">Modifier le Goodie</h2>

      <div class="flex flex-col sm:flex-row flex-wrap gap-4 items-start mb-4">
        <input v-model="editingGoodie.name" type="text" placeholder="Nom"
               class="border border-gray-300 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full sm:w-auto"/>
        <input v-model.number="editingGoodie.price" type="number" placeholder="Prix"
               class="border border-gray-300 rounded-lg p-3 w-full sm:w-32 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
        <input v-model.number="editingGoodie.quantity" type="number" placeholder="Quantité"
               class="border border-gray-300 rounded-lg p-3 w-full sm:w-32 focus:outline-none focus:ring-2 focus:ring-yellow-400"/>
        <button @click="saveEdit()"
                class="bg-yellow-400 text-white px-4 sm:px-6 py-3 rounded-xl hover:bg-yellow-500 transition-all shadow-md font-semibold w-full sm:w-auto">
          Enregistrer
        </button>
        <button @click="cancelEdit()"
                class="bg-gray-300 text-gray-800 px-4 sm:px-6 py-3 rounded-xl hover:bg-gray-400 transition-all shadow-md font-semibold w-full sm:w-auto">
          Annuler
        </button>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div class="flex-1">
          <label class="font-semibold text-gray-800">Tailles :</label>
          <div class="flex gap-2 flex-wrap mt-2">
            <label v-for="s in goodiesStore.sizes" :key="s.id" class="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" :value="s.id" v-model="editingSizes" class="accent-yellow-400 w-5 h-5"/>
              <span class="text-gray-700">{{ s.label }}</span>
            </label>
          </div>
        </div>

        <div class="flex-1">
          <label class="font-semibold text-gray-800">Couleurs :</label>
          <div class="flex gap-2 flex-wrap mt-2">
            <label v-for="c in goodiesStore.colors" :key="c.id" class="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" :value="c.id" v-model="editingColors" class="accent-yellow-400 w-5 h-5"/>
              <span class="text-gray-700">{{ c.label }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Table des goodies -->
    <div class="overflow-x-auto bg-white rounded-2xl shadow-xl mb-6">
      <DataTable :headers="headers" :items="displayGoodies" class="rounded-2xl min-w-[600px]">
        <template #sizes="{ item }">
          {{ item.sizes.map(s => s.label).join(", ") }}
        </template>
        <template #colors="{ item }">
          {{ item.colors.map(c => c.label).join(", ") }}
        </template>
        <template #actions="{ item }">
          <button
              class="px-3 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-all font-semibold mb-2 sm:mb-0"
              @click="editGoodie(item)"
          >
            {{ t("GoodiesBoard.1") }}
          </button>
          <button
              class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-semibold"
              @click="removeGoodie(item)"
          >
            {{ t("GoodiesBoard.2") }}
          </button>
        </template>
      </DataTable>
    </div>

    <p v-if="!sellingActive" class="mt-2 text-red-600 font-semibold">
      La vente de goodies est désactivée.
    </p>

    <div class="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-5 overflow-x-auto">
      <DataTable :headers="['id','label']" :items="goodiesStore.colors" class="rounded-2xl shadow-xl min-w-[300px]"/>
      <DataTable :headers="['id','label']" :items="goodiesStore.sizes" class="rounded-2xl shadow-xl min-w-[300px]"/>
    </div>
  </div>
</template>



<script setup>
import {computed, onMounted, ref} from 'vue'
import {useGoodiesStore, useUserStore} from "@/stores/index.js";
import DataTable from "@/components/utils/DataTable.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const goodiesStore = useGoodiesStore()
const userStore = useUserStore()

const sellingActive = ref(true)
const selectedSizes = ref([])
const selectedColors = ref([])
const newGoodieBase = ref({
  user_id: userStore.currentUser.id,
  name: "",
  price: 0,
  quantity: 0,
})
const editingGoodie = ref(null)
const editingSizes = ref([])
const editingColors = ref([])
const newColor = ref({
  label: ""
})
const newSize = ref({
  label: ""
})

const headers = [
  "id", "name", "price", "quantity", "sizes", "colors"
]



const displayGoodies = computed(() => {
  return goodiesStore.goodies.map(goodie => {
    const sizeIds = goodiesStore.goodiesSizes
        .filter(gs => gs.idgoodie === goodie.id)
        .map(gs => gs.idsize)

    const colorIds = goodiesStore.goodiesColors
        .filter(gc => gc.idgoodie === goodie.id)
        .map(gc => gc.idcolor)

    return {
      ...goodie,
      sizes: goodiesStore.sizes.filter(s => sizeIds.includes(s.id)),
      colors: goodiesStore.colors.filter(c => colorIds.includes(c.id)),
    }
  })
})

async function addColor() {
  await goodiesStore.addColor(newColor.value)
  console.log(goodiesStore.colors)
}

async function addSize() {
  await goodiesStore.addSize(newSize.value)


}

async function addGoodieVariants() {
  if (!sellingActive.value) return

  if (!newGoodieBase.value.name || newGoodieBase.value.price <= 0) return

  if (selectedSizes.value.length === 0) return
  if (selectedColors.value.length === 0) return

  const newGoodie = await goodiesStore.addGoodie(newGoodieBase.value)
  console.log(newGoodie)

  selectedSizes.value.forEach(sizeId => {
    goodiesStore.addGoodieSize({
      idgoodie:newGoodie.id,
      idsize:sizeId
    })
  })
  selectedColors.value.forEach(colorId => {
    goodiesStore.addGoodieColor({
      idgoodie:newGoodie.id,
      idcolor:colorId
    })



  })

  selectedSizes.value = []
  selectedColors.value = []
  newGoodieBase.value.name = ""
  newGoodieBase.value.price = 0

}


async function removeGoodie(item) {
  if (!sellingActive.value) return
  goodiesStore.removeGoodie(item)
}

async function toggleSelling() {
  console.log('Vente active:', sellingActive.value)
}





async function cancelEdit() {
  editingGoodie.value = null
}

async function editGoodie(item) {
  editingGoodie.value = { ...item }

  // récupérer les tailles et couleurs existantes du goodie
  editingSizes.value = goodiesStore.getSizesByGoodieId(item.id).map(s => s.id)
  editingColors.value = goodiesStore.getColorsByGoodieId(item.id).map(c => c.id)
}

async function saveEdit() {
  if (!editingGoodie.value) return
  console.log(editingGoodie.value.id)
  await goodiesStore.updateGoodie(editingGoodie.value, userStore.currentUser.id)


  await goodiesStore.deleteAllColors(editingGoodie.value.id)
  for (const color of editingColors.value) {

    let data = {
      idgoodie: editingGoodie.value.id,
      idcolor: color
    }
    await goodiesStore.addGoodieColor(data)

  }


  await goodiesStore.deleteAllSizes(editingGoodie.value.id)
  for (const size of editingColors.value) {

    let data = {
      idgoodie: editingGoodie.value.id,
      idsize: size
    }
    await goodiesStore.addGoodieSize(data)

  }



  editingGoodie.value = null
  editingSizes.value = []
  editingColors.value = []
}

onMounted(async () => {
  await goodiesStore.getGoodiesByProviderId(userStore.currentUser.id)
  await goodiesStore.getSizes()
  await goodiesStore.getColors()
  await goodiesStore.getGoodiesSizes()
  await goodiesStore.getGoodiesColors()


})
</script>