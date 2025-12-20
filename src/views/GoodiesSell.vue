<template>
  <section class="flex min-h-screen bg-gradient-to-b from-[var(--noir)] via-[var(--grisf)] to-[var(--noir)] text-[var(--blanc)] px-8 py-16">

    <!-- Grid goodies -->
    <div class="flex-1 max-w-7xl">
      <!-- Header -->
      <header class="mb-16 text-center">
        <h1 class="text-5xl font-extrabold tracking-wide mb-4">
          Boutique
        </h1>
        <p class="text-zinc-400 text-lg max-w-2xl mx-auto">
          Produits exclusifs inspirés du cinéma. Éditions limitées !
        </p>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <article
            v-for="(goodie, index) in providerStore.goodies"
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
                  class="text-xs px-3 py-1 rounded-full"
                  :class="goodie.active
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/20 text-red-400'"
              >
                {{ goodie.active ? 'En vente' : 'Indisponible' }}
              </span>
            </div>
            <button
                class="mt-4 w-full py-3 rounded-xl font-semibold tracking-wide bg-[var(--jaune)] text-[var(--noir)] hover:bg-[var(--jaune)] transition disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="!userStore.currentUser "
                @click="addBasket(goodie)"
            >
              Ajouter au panier
            </button>
          </div>
        </article>
      </div>
    </div>

    <!-- Sidebar Panier -->
    <aside class="w-96 bg-[var(--grisf)] p-6 rounded-2xl shadow-xl sticky top-16 h-[calc(100vh-4rem)] flex flex-col ml-8">
      <h2 class="text-2xl font-bold mb-4">Votre Panier</h2>

      <div v-if="currentBasket.length === 0" class="text-zinc-400 mb-4">Votre panier est vide</div>

      <ul class="flex-1 overflow-y-auto mb-4">
        <li
            v-for="(item, index) in currentBasket"
            :key="index"
            class="flex justify-between items-center py-2 border-b border-zinc-700"
        >
          <span>{{ item.name }}</span>
          <span>{{ item.price }} €</span>
        </li>
      </ul>

      <div class="flex justify-between font-bold text-[var(--jaune)] mb-4">
        <span>Total</span>
        <span>{{ total }} €</span>
      </div>

      <button
          class="w-full py-3 rounded-xl font-semibold tracking-wide bg-[var(--jaune)] text-[var(--noir)] hover:bg-[var(--jaune)] transition disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="basket.length === 0"
      >
        Commander
      </button>
    </aside>

  </section>
</template>

<script setup>
import {useGoodiesStore, useProviderStore, useUserStore} from "@/stores/index.js"
import { ref, computed, onMounted } from "vue"

const providerStore = useProviderStore()
const userStore = useUserStore()
const goodiesStore = useGoodiesStore();
const basket = ref([])

const getImg = (img) => new URL(`../assets/goodies/${img}.png`, import.meta.url).href

function addBasket(item) {
   basket.value.push(item)
}

const total = computed(() =>
    basket.value.reduce((sum, item) => sum + item.price, 0)
)

const currentBasket = computed(() => {
  return providerStore.goodies
      .map(goodie => {
        const inBasket = goodiesStore.basketItems.find(b => b.idgoodies === goodie.id)
        if (inBasket) {
          return {
            ...goodie,
            count: inBasket.count
          }
        }
      })
      .filter(Boolean) // supprimer les undefined
})

onMounted(async () => {
  await providerStore.getGoodies()
  await goodiesStore.getBasketByUserId(userStore.currentUser.id)
  await goodiesStore.getBasketItems(goodiesStore.basket.id)
})
</script>
