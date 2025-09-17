<template>
  <Disclosure
      as="nav"
      :class="[
      'fixed w-full transition-colors duration-500',
      isHome ? (isScrolled ? 'bg-white text-black shadow-[0_10px_30px_rgba(0,0,0,0.8)]' : 'bg-transparent text-white') : 'bg-white text-black shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
    ]"
      v-slot="{ open }"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton
              :class="[
              'relative inline-flex items-center justify-center rounded-md p-2 focus:outline-2 focus:-outline-offset-1 transition-colors duration-300',
              isHome
                ? (isScrolled ? 'text-black hover:bg-[var(--bleu)] hover:text-white focus:outline-black' : 'text-white hover:bg-[var(--bleu)] hover:text-white focus:outline-white')
                : 'text-black hover:bg-[var(--bleu)] hover:text-white focus:outline-black'
            ]"
          >
            <span class="absolute -inset-0.5"/>
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true"/>
            <XMarkIcon v-else class="block size-6" aria-hidden="true"/>
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
            <img
                class="h-8 w-auto"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
            />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <RouterLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  :class="[
                  'rounded-md px-3 py-2 text-[19px] font-medium transition-colors duration-300',
                  isHome
                    ? (isScrolled ? 'text-black hover:bg-[var(--bleu)] hover:text-white' : 'text-white hover:bg-[var(--bleu)] hover:text-white')
                    : 'text-black hover:bg-[var(--bleu)] hover:text-white'
                ]"
              >
                {{ t(item.name) }}
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center space-x-2">
          <button
              @click="locale = 'fr'"
              :class="[
              'rounded-md px-3 py-2 text-[19px] font-medium transition-colors duration-300',
              isHome
                ? (isScrolled ? 'text-black hover:bg-[var(--bleu)] hover:text-white' : 'text-white hover:bg-[var(--bleu)] hover:text-white')
                : 'text-black hover:bg-[var(--bleu)] hover:text-white'
            ]"
          >
            FR
          </button>
          <button
              @click="locale = 'en'"
              :class="[
              'rounded-md px-3 py-2 text-[19px] font-medium transition-colors duration-300',
              isHome
                ? (isScrolled ? 'text-black hover:bg-[var(--bleu)] hover:text-white' : 'text-white hover:bg-[var(--bleu)] hover:text-white')
                : 'text-black hover:bg-[var(--bleu)] hover:text-white'
            ]"
          >
            EN
          </button>
          <RouterLink
              to="/login"
              :class="[
              'rounded-md px-3 py-2 text-[19px] font-medium transition-colors duration-300',
              isHome
                ? (isScrolled ? 'text-black hover:bg-[var(--bleu)] hover:text-white' : 'text-white hover:bg-[var(--bleu)] hover:text-white')
                : 'text-black hover:bg-[var(--bleu)] hover:text-white'
            ]"
          >
            {{ t('nav.seConnecter') }}
          </RouterLink>
        </div>
      </div>
    </div>
    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[
            'block rounded-md px-3 py-2 text-base font-medium transition-colors duration-300',
            isHome
              ? (isScrolled ? 'text-black hover:bg-[var(--bleu)] hover:text-white' : 'text-white hover:bg-[var(--bleu)] hover:text-white')
              : 'text-black hover:bg-[var(--bleu)] hover:text-white'
          ]"
        >
          {{ t(item.name) }}
        </RouterLink>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {ref, onMounted, onUnmounted, computed} from 'vue'
import {useRoute} from 'vue-router'
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/vue'
import {Bars3Icon, XMarkIcon} from '@heroicons/vue/24/outline'
import {RouterLink} from 'vue-router'
import {useI18n} from 'vue-i18n'

const {t, locale} = useI18n()
const route = useRoute()

const navigation = [
  {name: 'nav.accueil', href: '/'},
  {name: 'nav.programme', href: '/programme'},
  {name: 'nav.intervenant', href: '/intervenant'},
  {name: 'nav.billeterie', href: '/billeterie'},
  {name: 'nav.galerie', href: '/galerie'},
  {name: 'nav.contact', href: '/contact'}
]

const isScrolled = ref(false)
const isHome = computed(() => route.path === '/')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
