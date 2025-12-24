<template>
  <div class="p-6 w-full">
    <h1 class="text-2xl font-bold mb-4">{{ t("GoodiesBoard.9") }}</h1>

    <!-- Activer/désactiver la vente -->
    <div class="mb-6 flex items-center gap-4">
      <label class="font-semibold">{{ t("GoodiesBoard.11") }}</label>
      <input type="checkbox" v-model="sellingActive" @change="toggleSelling"/>
    </div>

    <!-- Formulaire création -->
    <div class="flex">
      <div class="mb-6 border p-4 rounded bg-white shadow"
           :class="{ 'opacity-50 pointer-events-none': !sellingActive }">
        <h2 class="text-xl font-semibold mb-2">{{ t("GoodiesBoard.8") }}</h2>
        <div class="flex flex-col md:flex-row gap-4 items-start">

          <label for="name">{{ t("GoodiesBoard.7") }}</label><input
            id="name"
            v-model="newGoodieBase.name"
            type="text"
            placeholder="Nom du goodie"
            class="border p-2 rounded flex-1"
        />
          <label for="price">{{ t("GoodiesBoard.6") }}</label><input
            id="price"
            v-model.number="newGoodieBase.price"
            type="number"
            placeholder="Prix"
            class="border p-2 rounded w-32"
        />
          <label for="quantity">{{ t("GoodiesBoard.5") }}</label><input
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
            {{ t("GoodiesBoard.4") }}
          </button>


        </div>
        <div class="flex-col">
          <label class="font-semibold">{{ t("GoodiesBoard.10") }}</label>
          <div class="flex  gap-2">
            <label v-for="s in goodiesStore.sizes" :key="s.id" class="flex items-center gap-1">
              <input
                  type="checkbox"
                  :value="s.id"
                  v-model="selectedSizes"
              />
              {{ s.label }}
            </label>
          </div>
          <label class="font-semibold">{{ t("GoodiesBoard.3") }}</label>
          <div class="flex gap-2">
            <label v-for="c in goodiesStore.colors" :key="c.id" class="flex items-center gap-1">

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

      <div class="mb-6 border p-4 rounded bg-white shadow"
           :class="{ 'opacity-50 pointer-events-none': !sellingActive }">
        <h2 class="text-xl font-semibold mb-2">ajouter une couleur</h2>

        <label for="name">{{ t("GoodiesBoard.7") }}</label><input
          id="name"
          v-model="newColor.label"
          type="text"
          placeholder="Nom du goodie"
          class="border p-2 rounded flex-1"
      />

        <button
            @click="addColor()"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {{ t("GoodiesBoard.4") }}
        </button>

      </div>

      <div class="mb-6 border p-4 rounded bg-white shadow"
           :class="{ 'opacity-50 pointer-events-none': !sellingActive }">
        <h2 class="text-xl font-semibold mb-2">ajouter une taille</h2>

        <label for="name">{{ t("GoodiesBoard.7") }}</label><input
          id="name"
          v-model="newSize.label"
          type="text"
          placeholder="Nom du goodie"
          class="border p-2 rounded flex-1"
      />

        <button
            @click="addSize()"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {{ t("GoodiesBoard.4") }}
        </button>


      </div>
    </div>


    <div v-if="editingGoodie" class="mb-6 border p-4 rounded bg-gray-50 shadow">
      <h2 class="text-xl font-semibold mb-2">Modifier le Goodie</h2>

      <div class="flex flex-col md:flex-row gap-4 items-start mb-4">
        <input
            v-model="editingGoodie.name"
            type="text"
            placeholder="Nom"
            class="border p-2 rounded flex-1"
        />
        <input
            v-model.number="editingGoodie.price"
            type="number"
            placeholder="Prix"
            class="border p-2 rounded w-32"
        />
        <input
            v-model.number="editingGoodie.quantity"
            type="number"
            placeholder="Quantité"
            class="border p-2 rounded w-32"
        />
        <button
            @click="saveEdit()"
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Enregistrer
        </button>
        <button
            @click="cancelEdit()"
            class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Annuler
        </button>
      </div>

      <div class="flex flex-col md:flex-row gap-6">
        <div>
          <label class="font-semibold">Tailles :</label>
          <div class="flex gap-2 flex-wrap">
            <label v-for="s in goodiesStore.sizes" :key="s.id" class="flex items-center gap-1">
              <input
                  type="checkbox"
                  :value="s.id"
                  v-model="editingSizes"
              />
              {{ s.label }}
            </label>
          </div>
        </div>

        <div>
          <label class="font-semibold">Couleurs :</label>
          <div class="flex gap-2 flex-wrap">
            <label v-for="c in goodiesStore.colors" :key="c.id" class="flex items-center gap-1">
              <input
                  type="checkbox"
                  :value="c.id"
                  v-model="editingColors"
              />
              {{ c.label }}
            </label>
          </div>
        </div>
      </div>
    </div>



    <!-- Table des goodies -->
    <div class="overflow-x-auto bg-white rounded shadow">
      <DataTable :headers="headers" :items="displayGoodies">
        <template #sizes="{ item }">
          {{ item.sizes.map(s => s.label).join(", ") }}
        </template>

        <template #colors="{ item }">
          {{ item.colors.map(c => c.label).join(", ") }}
        </template>
        <template #actions="{ item }">
          <button
              class="px-2 py-1 bg-[var(--vert)] text-[var(--noir)] rounded "
              @click="editGoodie(item)"
          >
            {{ t("GoodiesBoard.1") }}
          </button>
          <button
              @click="removeGoodie(item)"
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

    <div class="flex gap-5 mt-5 mx-25">

      <DataTable :headers="['id','label']" :items="goodiesStore.colors"/>
      <DataTable :headers="['id','label']" :items="goodiesStore.sizes"/>
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
