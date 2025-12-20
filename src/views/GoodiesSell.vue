<template>
  <section class="min-h-screen bg-gradient-to-b from-[var(--noir)] via-[var(--grisf)] to-[var(--noir)] text-[var(--blanc)] px-8 py-16">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="mb-16 text-center">
        <h1 class="text-5xl font-extrabold tracking-wide mb-4">
          Boutique Officielle du Festival
        </h1>
        <p class="text-zinc-400 text-lg max-w-2xl mx-auto">
          Produits exclusifs inspirés du cinéma. Éditions limitées. Vente directe par les prestataires.
        </p>
      </header>

      <!-- Grid goodies -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <article
            v-for="(goodie, index) in providerStore.goodies"
            :key="index"
            class="group bg-[var(--grisf)] border border-[var(--grisf)] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition"
        >
          <!-- Image -->
          <div class="h-56 bg-[var(--grisf)] flex items-center justify-center overflow-hidden">
            <img
                :src="goodie.image || '/placeholder-cinema.jpg'"
                alt=""
                class="object-cover h-full w-full group-hover:scale-105 transition duration-300"
            />
          </div>

          <!-- Content -->
          <div class="p-6 flex flex-col gap-4">
            <h2 class="text-2xl font-semibold tracking-tight">
              {{ goodie.name }}
            </h2>

            <p class="text-zinc-400 text-sm leading-relaxed line-clamp-3">
              {{ goodie.description }}
            </p>

            <div class="flex items-center justify-between mt-4">
              <span class="text-xl font-bold text-[var(--jaune)]">
                {{ goodie.price }} €
              </span>

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
                class="mt-4 w-full py-3 rounded-xl font-semibold tracking-wide
                     bg-[var(--jaune)] text-[var(--noir)] hover:bg-[var(--jaune)] transition
                     disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="!goodie.active"
            >
              Ajouter au panier
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useProviderStore } from "@/stores/index.js"
import { onMounted } from "vue"

const providerStore = useProviderStore()

onMounted(async () => {
  await providerStore.getGoodies()
})
</script>
