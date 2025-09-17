<template>
  <Disclosure as="nav" class="fixed bg-[var(--blanc)] w-full after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">

        <!-- Bouton mobile -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)] focus:outline-2 focus:-outline-offset-1 focus:outline-[var(--noir)]">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>

        <!-- Logo + liens -->
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
            <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a v-for="item in navigation"
                 :key="item.name"
                 :href="item.href"
                 class="text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)] rounded-md px-3 py-2 text-sm font-medium">
                {{ t(item.name) }}
              </a>
            </div>
          </div>
        </div>

        <!-- Lang switch + bouton connexion -->
        <div class="flex items-center justify-center space-x-2">
          <button @click="locale = 'fr'" class="text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)] rounded-md px-3 py-2 text-sm font-medium">FR</button>
          <button @click="locale = 'en'" class="text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)] rounded-md px-3 py-2 text-sm font-medium">EN</button>

          <a href="#"
             class="text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)] rounded-md px-3 py-2 text-sm font-medium">
            {{ t('nav.seConnecter') }}
          </a>
        </div>
      </div>
    </div>

    <!-- Menu mobile -->
    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <DisclosureButton v-for="item in navigation"
                          :key="item.name"
                          as="a"
                          :href="item.href"
                          class="block text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)] rounded-md px-3 py-2 text-base font-medium">
          {{ t(item.name) }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const navigation = [
  { name: 'nav.accueil', href: '#' },
  { name: 'nav.programme', href: '#' },
  { name: 'nav.intervenant', href: '#' },
  { name: 'nav.billeterie', href: '#' },
  { name: 'nav.galerie', href: '#' },
  { name: 'nav.contact', href: '#' },
]
</script>
