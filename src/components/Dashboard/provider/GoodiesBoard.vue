<template>
  <div class="pl-64 min-h-screen bg-white text-gray-800">

    <div class="flex items-center justify-between px-8 pt-8">
      <div>
        <h1 class="text-4xl font-extrabold tracking-tight">
          {{ t("GoodiesBoard.9") }}
        </h1>
        <p class="text-gray-500 mt-1 text-lg">
          Boutique de goodies officiels – produits exclusifs & souvenirs premium
        </p>
      </div>

      <div class="flex items-center gap-3">
        <span class="font-semibold">
          {{ t("GoodiesBoard.11") }}
        </span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
              type="checkbox"
              v-model="sellingActive"
              @change="toggleSelling"
              class="sr-only peer"
          >
          <div class="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full
                      peer peer-checked:bg-yellow-400 transition"></div>
          <div class="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow
                      peer-checked:translate-x-7 transition"></div>
        </label>
      </div>
    </div>

    <div class="px-8 py-6">

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div
            class="rounded-2xl border bg-white shadow-xl p-6 hover:shadow-2xl transition"
            :class="{ 'opacity-50 pointer-events-none': !sellingActive }">

          <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
            🍿 {{ t("GoodiesBoard.8") }}
          </h2>

          <div class="flex flex-col gap-4">

            <div class="flex flex-col gap-2">
              <label class="font-semibold">{{ t("GoodiesBoard.7") }}</label>
              <input
                  v-model="newGoodieBase.name"
                  type="text"
                  placeholder="Ex : T-Shirt édition festival"
                  class="border p-2 rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-2">
                <label class="font-semibold">{{ t("GoodiesBoard.6") }}</label>
                <input
                    v-model.number="newGoodieBase.price"
                    type="number"
                    placeholder="Prix"
                    class="border p-2 rounded-lg focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="font-semibold">{{ t("GoodiesBoard.5") }}</label>
                <input
                    v-model.number="newGoodieBase.quantity"
                    type="number"
                    placeholder="Stock"
                    class="border p-2 rounded-lg focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            <div>
              <label class="font-semibold">Tailles</label>
              <div class="flex gap-3 flex-wrap mt-2">
                <label
                    v-for="s in goodiesStore.sizes"
                    :key="s.id"
                    class="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg hover:bg-yellow-200 transition">
                  <input type="checkbox" :value="s.id" v-model="selectedSizes"/>
                  {{ s.label }}
                </label>
              </div>
            </div>

            <div>
              <label class="font-semibold">Couleurs</label>
              <div class="flex gap-3 flex-wrap mt-2">
                <label
                    v-for="c in goodiesStore.colors"
                    :key="c.id"
                    class="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg hover:bg-yellow-200 transition">
                  <input type="checkbox" :value="c.id" v-model="selectedColors"/>
                  {{ c.label }}
                </label>
              </div>
            </div>

            <button
                @click="addGoodieVariants()"
                class="mt-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-xl shadow">
              ➕ {{ t("GoodiesBoard.4") }}
            </button>

          </div>
        </div>

        <div
            class="rounded-2xl border bg-white shadow-xl p-6 hover:shadow-2xl transition"
            :class="{ 'opacity-50 pointer-events-none': !sellingActive }">

          <h2 class="text-xl font-bold mb-3">🎨 Ajouter une couleur</h2>

          <input
              v-model="newColor.label"
              type="text"
              placeholder="Ex : Rouge cinéma"
              class="border p-2 rounded-lg w-full focus:ring-2 focus:ring-yellow-400"
          />

          <button
              @click="addColor()"
              class="mt-4 bg-yellow-400 hover:bg-yellow-500 w-full text-black font-bold px-4 py-2 rounded-xl shadow">
            Ajouter
          </button>
        </div>

        <div
            class="rounded-2xl border bg-white shadow-xl p-6 hover:shadow-2xl transition"
            :class="{ 'opacity-50 pointer-events-none': !sellingActive }">

          <h2 class="text-xl font-bold mb-3">📏 Ajouter une taille</h2>

          <input
              v-model="newSize.label"
              type="text"
              placeholder="Ex : XXL"
              class="border p-2 rounded-lg w-full focus:ring-2 focus:ring-yellow-400"
          />

          <button
              @click="addSize()"
              class="mt-4 bg-yellow-400 hover:bg-yellow-500 w-full text-black font-bold px-4 py-2 rounded-xl shadow">
            Ajouter
          </button>
        </div>

      </div>
    </div>

    <div class="px-8">
      <div class="rounded-2xl border bg-white shadow-xl p-6">
        <DataTable :headers="headers" :items="displayGoodies">
          <template #sizes="{ item }">
            {{ item.sizes.map(s => s.label).join(", ") }}
          </template>

          <template #colors="{ item }">
            {{ item.colors.map(c => c.label).join(", ") }}
          </template>

          <template #actions="{ item }">
            <button
                class="px-3 py-1 bg-yellow-300 hover:bg-yellow-400 text-black rounded font-semibold"
                @click="editGoodie(item)">
              {{ t("GoodiesBoard.1") }}
            </button>

            <button
                class="px-3 py-1 bg-red-400 hover:bg-red-500 text-black rounded font-semibold ml-2"
                @click="removeGoodie(item)">
              {{ t("GoodiesBoard.2") }}
            </button>
          </template>
        </DataTable>
      </div>
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
