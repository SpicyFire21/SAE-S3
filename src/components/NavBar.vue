<template>
  <Disclosure
      as="nav"
      :class="[

      'fixed w-full transition-colors duration-500 z-100',
      isHome ? (isScrolled ? 'bg-[var(--blanc)] text-[var(--noir)] shadow-[0_10px_30px_rgba(0,0,0,0.6)]' : 'bg-transparent text-[var(--blanc)]') : 'bg-[var(--blanc)] text-[var(--noir)] shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
      ,'fixed w-full z-10 transition-colors duration-500 z-100',
      isHome ? (isScrolled ? 'bg-[var(--blanc)] text-[var(--noir)] shadow-[0_10px_30px_rgba(0,0,0,0.6)] z-10' : 'bg-transparent text-[var(--blanc)]') : 'bg-[var(--blanc)] text-[var(--noir)] shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
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
                ? (isScrolled ? 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)] focus:outline-[var(--noir)]' : 'text-[var(--blanc)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)] focus:outline-[var(--blanc)]')
                : 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)] focus:outline-[var(--noir)]'
            ]"
          >
            <span class="absolute -inset-0.5"/>
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true"/>
            <XMarkIcon v-else class="block size-6" aria-hidden="true"/>
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <RouterLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  :class="[
                  'rounded-md px-3 py-2 text-[19px] font-medium transition-colors duration-300',
                  isHome
                    ? (isScrolled ? 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]' : 'text-[var(--blanc)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]')
                    : 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]'
                ]"
              >
                {{ t(item.name) }}
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center space-x-2">
          <button
              v-if="locale === 'en'"

              @click="changeLanguage('fr')"
              :class="[
              'rounded-md px-3 py-2 text-[19px] font-medium transition-colors duration-300',
              isHome
                ? (isScrolled ? 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]' : 'text-[var(--blanc)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]')
                : 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]'
            ]"
          >
            FR
          </button>
          <button
              @click="changeLanguage('en')"
              v-if="locale === 'fr'"

              :class="[
              'rounded-md px-3 py-2 text-[19px] font-medium transition-colors duration-300',
              isHome
                ? (isScrolled ? 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]' : 'text-[var(--blanc)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]')
                : 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]'
            ]"
          >
            EN
          </button>
          <RouterLink
              to="/login"
              v-if="!userStore.currentUser"
              :class="[
              'rounded-md px-3 py-2 text-[19px] font-medium transition-colors duration-300',
              isHome
                ? (isScrolled ? 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]' : 'text-[var(--blanc)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]')
                : 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]'
            ]"
          >
            {{ t('nav.seConnecter') }}
          </RouterLink>
          <RouterLink
              to="/account"
              v-if="userStore.currentUser && userStore.currentUser.droit === '0'"
              :class="[
              'rounded-md px-3 py-2 text-[19px] font-medium transition-colors duration-300',
              isHome
                ? (isScrolled ? 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]' : 'text-[var(--blanc)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]')
                : 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]'
            ]"
          >
            {{ t('nav.compte') }}
          </RouterLink>
          <RouterLink
              :to="uri"
              v-if="userStore.currentUser  && userStore.currentUser.droit !== '0'"
              :class="[
              'rounded-md px-3 py-2 text-[19px] font-medium transition-colors duration-300',
              isHome
                ? (isScrolled ? 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]' : 'text-[var(--blanc)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]')
                : 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]'
            ]"
          >
            {{ t('nav.dashboard') }}
          </RouterLink>

          <RouterLink
              to="/"
              :class="[
              'rounded-md px-3 py-2 text-[19px] font-medium transition-colors duration-300',
              isHome
                ? (isScrolled ? 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]' : 'text-[var(--blanc)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]')
                : 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]'
            ]"
              @click="logout"
              v-if="userStore.currentUser">
            {{ t('nav.seDeconnecter') }}

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
              ? (isScrolled ? 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]' : 'text-[var(--blanc)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]')
              : 'text-[var(--noir)] hover:bg-[var(--bleu)] hover:text-[var(--blanc)]'
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
import {useUserStore} from "@/stores/index.js";
const userStore = useUserStore();
import logo from '@/assets/img/logo.webp'


const { t, locale } = useI18n()

const route = useRoute()

const uri = computed(()=>{
  if (userStore.currentUser.droit==="2"){
    return "/admin-dashboard";
  } else {
    return "/provider-dashboard"
  }
})

const navigation = [
  {name: 'nav.accueil', href: '/'},
  {name: 'nav.billeterie', href: '/ticket'},
  {name: 'nav.film', href: '/films'},
  {name:'nav.goodies',href:'/goodies'},
  {name: 'nav.scenePrincipale', href: '/scene'}

]

const isScrolled = ref(false)
const isHome = computed(() => route.path === '/')

function logout(){
  userStore.logout();
}

const changeLanguage = (lan) => {
  locale.value = lan;
}

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
