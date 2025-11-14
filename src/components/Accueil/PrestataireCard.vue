<template>
  <div class="w-full px-10 py-5">
    <div class="grid grid-cols-3 gap-6 justify-items-center">
      <div
          v-for="(provider, index) in providers"
          :key="provider.id || index"
          class="bg-white w-full max-w-sm p-6 border border-gray-300 rounded-lg shadow-lg flex flex-col items-center"
      >
        <img
            v-if="provider.nom_photo"
            :src="getProviderImage(provider.nom_photo)"
            :alt="provider.name || 'Prestataire'"
            class="w-25 h-25 object-cover rounded-3xl mb-4"
        />

        <p class="text-[var(--bleu)] text-xl mb-1">
          {{ provider.name || '—' }}
        </p>
        <p class="text-gray-300 mb-2">
          {{ provider.type || '—' }}
        </p>

        <div class="flex items-center mb-2 space-x-1">
          <template v-for="i in 5" :key="i">
            <svg
                v-if="i <= Math.floor(provider.note)"
                class="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 0 0 .95.69h4.147c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 0 0-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 0 0-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 0 0-.364-1.118L2.078 9.378c-.783-.57-.38-1.81.588-1.81h4.147a1 1 0 0 0 .95-.69l1.286-3.95z"/>
            </svg>

            <svg
                v-else-if="i === Math.ceil(provider.note) && provider.note % 1 !== 0"
                class="w-5 h-5"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="half-grad">
                  <stop offset="50%" stop-color="#FACC15"/>
                  <stop offset="50%" stop-color="#D1D5DB"/>
                </linearGradient>
              </defs>
              <path fill="url(#half-grad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 0 0 .95.69h4.147c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 0 0-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 0 0-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 0 0-.364-1.118L2.078 9.378c-.783-.57-.38-1.81.588-1.81h4.147a1 1 0 0 0 .95-.69l1.286-3.95z"/>
            </svg>

            <svg
                v-else
                class="w-5 h-5 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 0 0 .95.69h4.147c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 0 0-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 0 0-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 0 0-.364-1.118L2.078 9.378c-.783-.57-.38-1.81.588-1.81h4.147a1 1 0 0 0 .95-.69l1.286-3.95z"/>
            </svg>
          </template>
        </div>

        <p class="text-gray-500 mb-4 text-sm font-roboto text-center">
          {{ provider.description }}
        </p>

        <a
            href="#"
            class="inline-flex items-center text-white tracking-widest bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-md text-sm px-4 py-2.5"
        >
          {{t('prestataireCard.giveOpinion')}}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useI18n} from "vue-i18n";

const { t,tm } = useI18n()

defineProps({
  providers: {
    type: Array,
    required: true
  }
});

const getProviderImage = (fileName) => {
  return new URL(`../../assets/img/${fileName}`, import.meta.url).href;
};
</script>

<style scoped>
</style>
