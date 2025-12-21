<template>
  <section class="flex min-h-screen bg-gradient-to-b from-[var(--noir)] via-[var(--grisf)] to-[var(--noir)] text-[var(--blanc)] px-8 py-16">

    <!-- Grid goodies -->
    <div class="flex-1 max-w-7xl">
      <!-- Header -->
      <header class="mb-16 text-center">
        <h1 class="text-5xl font-extrabold tracking-wide mb-4">
          Boutique
        </h1>
        <p class="text-[var(--gris)] text-lg max-w-2xl mx-auto">
          Produits exclusifs inspirés du cinéma. Éditions limitées !
        </p>
        <p v-if="!userStore.currentUser" class="text-[var(--rouge)] text-lg max-w-2xl mx-auto">
          Connecter vous pour acheter vos goodies !
        </p>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <article
            v-for="(goodie, index) in providerStore.goodiesWithOptions"
            :key="index"
            class="group bg-[var(--grisf)] border border-[var(--grisf)] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition"
        >
          <!-- Image -->
          <div class="h-56 bg-[var(--grisf)] flex items-center justify-center overflow-hidden">
            <img
                :src="getImg(goodie.name)"
                alt=""
                class="object-cover h-full w-full group-hover:scale-105 transition duration-300"
            />
          </div>

          <!-- Content -->
          <div class="p-6 flex flex-col gap-4">
            <h2 class="text-2xl font-semibold tracking-tight">{{ goodie.name }}</h2>
            <p class="text-[var(--gris)] text-sm leading-relaxed line-clamp-3">{{ goodie.description }}</p>
            <div class="flex items-center justify-between mt-4">
              <span class="text-xl font-bold text-[var(--jaune)]">{{ goodie.price }} €</span>
              <span
                  class="text-s px-3 py-1 rounded-full"
              >
                {{ goodie.quantity }} en stock
              </span>
            </div>

            <div class="flex text-[var(--noir)]">
              <!-- Couleur -->
              <select v-model="selectedColors[goodie.id]">
                <option
                    v-for="(item, index) in goodie.colors"
                    :key="index"
                    :value="item.id"
                >
                  {{ item.label }}
                </option>
              </select>

              <!-- Taille -->
              <select v-model="selectedSizes[goodie.id]">
                <option
                    v-for="(item, index) in goodie.sizes"
                    :key="index"
                    :value="item.id"
                >
                  {{ item.label }}
                </option>
              </select>

            </div>

            <div class="flex">
              <button
                  class="mt-4 w-full py-3 rounded-xl font-semibold tracking-wide bg-[var(--jaune)] text-[var(--noir)] hover:bg-[var(--jaune)] transition disabled:opacity-40 disabled:cursor-not-allowed"
                  :disabled="!userStore.currentUser "
                  @click="addBasket(goodie,quantities[goodie.id])"
              >
                Ajouter au panier
              </button>
              <input
                  type="number"
                  min="1"
                  :max="goodie.quantity"
                  v-model.number="quantities[goodie.id]"
                  class="w-16 ml-2 text-black bg-[var(--blanc)]"
              />

            </div>

          </div>
        </article>
      </div>
    </div>

    <!-- Sidebar Panier -->
    <aside class="w-96 bg-[var(--grisf)] p-6 rounded-2xl shadow-xl sticky top-16 h-[calc(100vh-4rem)] flex flex-col ml-8">
      <h2 class="text-2xl font-bold mb-4">Votre Panier</h2>

      <div v-if="goodiesStore.basketItems.length === 0" class="text-zinc-400 mb-4">Votre panier est vide</div>

      <ul class="flex-1 overflow-y-auto mb-4">
        <li
            v-for="(item, index) in groupedBasketItems"
            :key="index"
            class="flex flex-col gap-1 py-2 border-b border-zinc-700"
        >
          <div class="flex justify-between">
            <span class="font-semibold">{{ providerStore.getName(item.idgoodie) }}</span>
            <span>{{ item.count }} × {{ providerStore.getPrice(item.idgoodie) }} €</span>
          </div>
          <div class="flex justify-between text-sm text-[var(--gris)]">
            <span>Couleur : {{ providerStore.getColor(item.idcolor) }}</span>
            <span>Taille : {{ providerStore.getSize(item.idsize) }}</span>
          </div>
          <div class="flex justify-end font-bold text-[var(--jaune)]">
            Total : {{ (providerStore.getPrice(item.idgoodie) * item.count).toFixed(2) }} €
          </div>
        </li>
      </ul>

      <div class="flex justify-between font-bold text-[var(--jaune)] mb-4">
        <span>Total général</span>
        <span>{{ total.toFixed(2) }} €</span>
      </div>

      <button
          class="w-full py-3 rounded-xl font-semibold tracking-wide bg-[var(--jaune)] text-[var(--noir)] hover:bg-[var(--jaune)] transition disabled:opacity-40 disabled:cursor-not-allowed"
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
