<template>
  <section class="flex min-h-screen text-black px-8 py-24 bg-white">

    <!-- PRODUITS -->
    <div class="flex-1 max-w-7xl">
      <header class="mb-16 text-center">
        <h1 class="text-5xl font-extrabold tracking-wide mb-4">
          Boutique
        </h1>

        <p class="text-neutral-500 text-lg max-w-2xl mx-auto">
          Produits exclusifs inspirés du cinéma. Éditions limitées.
        </p>

        <p v-if="!userStore.currentUser"
           class="text-red-600 text-lg max-w-2xl mx-auto mt-2">
          Connectez-vous pour acheter vos goodies.
        </p>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <article
            v-for="(goodie, index) in providerStore.goodiesWithOptions"
            :key="index"
            class="group bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all"
        >

          <!-- IMAGE -->
          <div class="h-44 bg-neutral-50 flex items-center justify-center overflow-hidden">
            <img
                :src="getImg(goodie.name)"
                class="object-contain h-full w-full group-hover:scale-105 transition duration-300"
                alt=""
            />
          </div>

          <!-- CONTENT -->
          <div class="p-6 flex flex-col gap-4">
            <h2 class="text-xl tracking-tight">
              {{ goodie.name }}
            </h2>

            <p class="text-neutral-500 text-sm leading-relaxed line-clamp-3">
              {{ goodie.description }}
            </p>

            <div class="flex items-center justify-between mt-2">
              <span class="text-2xl text-yellow-500">
                {{ goodie.price }} €
              </span>

              <span class="text-sm px-3 py-1 rounded-full bg-neutral-100 text-neutral-700">
                {{ goodie.quantity }} en stock
              </span>
            </div>

            <!-- OPTIONS -->
            <div class="flex gap-3 mt-2">
              <select
                  v-model="selectedColors[goodie.id]"
                  class="border rounded-xl px-3 py-2 bg-white focus:ring-2 focus:ring-yellow-400"
              >
                <option v-for="(item, index) in goodie.colors" :key="index" :value="item.id">
                  {{ item.label }}
                </option>
              </select>

              <select
                  v-model="selectedSizes[goodie.id]"
                  class="border rounded-xl px-3 py-2 bg-white focus:ring-2 focus:ring-yellow-400"
              >
                <option v-for="(item, index) in goodie.sizes" :key="index" :value="item.id">
                  {{ item.label }}
                </option>
              </select>
            </div>

            <!-- ACTION -->
            <div class="flex mt-3">
              <button
                  class="w-full py-3 rounded-xl tracking-wide bg-yellow-400 text-black hover:bg-yellow-500 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  :disabled="!userStore.currentUser"
                  @click="addBasket(goodie, quantities[goodie.id])"
              >
                Ajouter au panier
              </button>

              <input
                  type="number"
                  min="1"
                  :max="goodie.quantity"
                  v-model.number="quantities[goodie.id]"
                  class="w-16 ml-2 border rounded-xl text-black bg-white text-center"
              />
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- PANIER -->
    <aside
        class="w-96 bg-white border border-neutral-200 p-6 rounded-2xl shadow-xl sticky top-16 h-[calc(100vh-4rem)] flex flex-col ml-8"
    >
      <h2 class="text-2xl mb-4">
        Votre Panier
      </h2>

      <div v-if="goodiesStore.basketItems.length === 0" class="text-neutral-400 mb-4">
        Votre panier est vide
      </div>

      <ul class="flex-1 overflow-y-auto mb-4">
        <li
            v-for="(item, index) in groupedBasketItems"
            :key="index"
            class="flex flex-col gap-1 py-2 border-b border-neutral-200"
        >
          <div class="flex justify-between">
            <span>
              {{ providerStore.getName(item.idgoodie) }}
            </span>
            <span>
              {{ item.count }} × {{ providerStore.getPrice(item.idgoodie) }} €
            </span>
          </div>

          <div class="flex justify-between text-sm text-neutral-500">
            <span>Couleur : {{ providerStore.getColor(item.idcolor) }}</span>
            <span>Taille : {{ providerStore.getSize(item.idsize) }}</span>
          </div>

          <div class="flex justify-end text-yellow-500">
            Total : {{ (providerStore.getPrice(item.idgoodie) * item.count).toFixed(2) }} €
          </div>
        </li>
      </ul>

      <div class="flex justify-between text-yellow-500 mb-4 text-lg">
        <span>Total général</span>
        <span>{{ total.toFixed(2) }} €</span>
      </div>

      <button
          class="w-full py-3 rounded-xl tracking-wide bg-black text-white hover:bg-neutral-900 transition disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="goodiesStore.basket.length === 0"
      >
        Commander
      </button>
    </aside>

  </section>
</template>


<script setup>
import {useGoodiesStore, useProviderStore, useUserStore} from "@/stores/index.js"
import { ref, computed, onMounted } from "vue"

const quantities = ref({})
const selectedColors = ref({})
const selectedSizes = ref({})

const providerStore = useProviderStore()
const userStore = useUserStore()
const goodiesStore = useGoodiesStore();


const getImg = (img) => new URL(`../assets/goodies/${img}.png`, import.meta.url).href

async function addBasket(goodie, count) {
  const idcolor = selectedColors.value[goodie.id]
  const idsize = selectedSizes.value[goodie.id]

  if (!idcolor || !idsize || count <= 0) return

  const item = {
    idgoodie: goodie.id,
    idcolor,
    idsize,
    count,
    price: goodie.price
  }

  goodiesStore.addBasketItems(item)
}


const total = computed(() => {
  return goodiesStore.basketItems.reduce((sum, item) => {
    return sum + (providerStore.getPrice(item.idgoodie) || 0) * Number(item.count)
  }, 0)
})




const groupedBasketItems = computed(() => {
  const map = {}

  goodiesStore.basketItems.forEach(item => {
    const key = `${item.idgoodie}-${item.idcolor}-${item.idsize}`
    if (!map[key]) {
      map[key] = { ...item, count: Number(item.count) }
    } else {
      map[key].count += Number(item.count)
    }
  })

  return Object.values(map)
})

onMounted(async () => {
  await providerStore.getGoodies()
  await providerStore.getSizes()
  await providerStore.getColors()
  await providerStore.getGoodiesSizes()
  await providerStore.getGoodiesColors()

  if (userStore.currentUser){
    await goodiesStore.getBasketByUserId(userStore.currentUser.id)
    await goodiesStore.getBasketItems(goodiesStore.basket.id)
  }

  providerStore.goodiesWithOptions.forEach(goodie => {
    const firstColorRelation = providerStore.goodiesColors.find(gc => gc.idgoodie === goodie.id)
    const firstSizeRelation = providerStore.goodiesSizes.find(gs => gs.idgoodie === goodie.id)
    selectedColors.value[goodie.id] = firstColorRelation?.idcolor ?? null
    selectedSizes.value[goodie.id] = firstSizeRelation?.idsize ?? null
    quantities.value[goodie.id] = 1
  })


})
</script>
