<template>
  <aside class="w-64 h-screen bg-white shadow-xl border-r flex flex-col p-6 fixed">

    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 tracking-wide">
        {{ t("asidebarDashboard.5") }}
      </h2>
      <div class="w-12 h-1 bg-yellow-400 rounded mt-2"></div>
    </div>

    <button
        @click="go('/provider-dashboard/profile')"
        v-if="userStore.currentUser.droit === '1'"
        class="w-full text-lg text-left px-4 py-2 rounded-lg text-gray-800 bg-gray-100
                 hover:bg-yellow-300 hover:shadow transition font-semibold space-y-3 mb-3">
      {{ t("asidebarDashboard.0") }}
    </button>

    <div class="space-y-3 mb-6">
      <button
          @click="logout()"
          class="w-full text-lg text-left px-4 py-2 rounded-lg text-gray-800 bg-gray-100
                 hover:bg-yellow-300 hover:shadow transition font-semibold">
        {{ t("asidebarDashboard.1") }}
      </button>


      <button
          @click="go('/')"
          class="w-full text-lg text-left px-4 py-2 rounded-lg text-gray-800 bg-gray-100
                 hover:bg-yellow-300 hover:shadow transition font-semibold">
        {{ t("asidebarDashboard.2") }}
      </button>
    </div>

    <div class="mb-8">
      <div v-if="locale === 'en'" class="flex items-center">
        <button
            @click="changeLanguage('fr')"
            class="w-full flex items-center gap-3 rounded-lg px-4 py-2 text-lg font-semibold
                   bg-gray-100 hover:bg-yellow-300 transition shadow-sm">
          <img src="@/assets/lang/fr.webp" alt="fr" class="w-[32px] rounded">
          FRANÇAIS
        </button>
      </div>

      <div v-if="locale === 'fr'" class="flex items-center">
        <button
            @click="changeLanguage('en')"
            class="w-full flex items-center gap-3 rounded-lg px-4 py-2 text-lg font-semibold
                   bg-gray-100 hover:bg-yellow-300 transition shadow-sm">
          <img src="@/assets/lang/en.webp" alt="en" class="w-[32px] rounded">
          ENGLISH
        </button>
      </div>
    </div>

    <div class="text-xl font-bold text-gray-700 mb-4">
      Menu
    </div>

    <nav class="flex flex-col gap-3">
      <button
          v-for="(item, i) in dash"
          :key="i"
          @click="go(item.to)"
          class="w-full text-left px-4 py-2 rounded-lg
                 bg-gray-100 text-gray-800 font-semibold
                 hover:bg-yellow-300 hover:shadow transition">
        {{ item.label }}
      </button>
    </nav>

    <div class="mt-auto pt-6">
      <div class="w-full h-[2px] bg-gray-200 mb-4"></div>
      <p class="text-sm text-gray-500 text-center">
        Le Grand Focus
      </p>
    </div>

  </aside>
</template>


<script setup>
import {computed, ref} from 'vue'
import { useRouter } from 'vue-router'
import {useUserStore} from "@/stores/index.js";

const userStore= useUserStore()
import {useI18n} from "vue-i18n";

const { t,locale } = useI18n()
const router = useRouter()

const dash = computed(()=>{
  if(userStore.currentUser && userStore.currentUser.droit === "1"){
    return provider.value
  } else {
    return admin.value
  }
})

const changeLanguage = (lan) => {
  locale.value = lan;
}

// Définition simple des entrées du menu
const admin = computed(() => [
  { label: t("asidebarDashboard.3.1"), to: '/admin-dashboard/requests' },
  { label: t("asidebarDashboard.3.3"), to: '/admin-dashboard/standsRequests' },
  { label: t("asidebarDashboard.3.2"), to: '/admin-dashboard/stats' },
  { label: t("asidebarDashboard.3.4"), to: '/admin-dashboard/votes' }
])

const provider = computed(() => [
  { label: "Stands", to: '/provider-dashboard/stands' },
  { label: t("asidebarDashboard.4.1"), to: '/provider-dashboard/goodies' },
  { label: t("asidebarDashboard.4.2"), to: '/provider-dashboard/stats' }
])
function go(to) {
  router.push(to)
}

async function logout(){
  await userStore.logout();
  await router.push("/")

}
</script>

