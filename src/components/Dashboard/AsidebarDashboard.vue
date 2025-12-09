<template>
  <aside class="w-60 h-screen bg-[var(--gris)] flex flex-col p-5  border-r border-[var(--noir)]">
    <button
        @click="logout()"
        class="w-full text-xl text-left px-4 py-2 rounded-md text-[var(--noir)] bg-[var(--gris)] hover:bg-[var(--jaune)] transition"
    >
      Deconnexion
    </button>
    <button
        @click="go('/')"

        class="w-full text-xl text-left px-4 py-2 rounded-md text-[var(--noir)] bg-[var(--gris)] hover:bg-[var(--jaune)] transition"
    >
      Acceder au Site
    </button>

    <div class="text-xl font-semibold mb-6">Menu</div>
    <nav class="flex flex-col space-y-3">
      <button
          v-for="(item, i) in dash"
          :key="i"
          @click="go(item.to)"
          class="w-full text-left px-4 py-2 rounded-md text-[var(--noir)] bg-[var(--gris)] hover:bg-[var(--jaune)] transition"
      >
        {{ item.label }}
      </button>
    </nav>
  </aside>
</template>

<script setup>
import {computed, ref} from 'vue'
import { useRouter } from 'vue-router'
import {useUserStore} from "@/stores/index.js";

const userStore= useUserStore()

const router = useRouter()

const dash = computed(()=>{
  if(userStore.currentUser && userStore.currentUser.droit === "1"){
    return provider.value
  } else {
    return admin.value
  }
})


// Définition simple des entrées du menu
const admin = ref([
  { label: 'Demande de Prestataires', to: '/admin-dashboard/requests' },
  { label: 'Statistiques', to: '/admin-dashboard/stats' }
])

const provider = ref([

  { label: 'Goodies', to: '/provider-dashboard/goodies' },
  { label: 'Statistiques', to: '/provider-dashboard/stats' }
])

function go(to) {
  router.push(to)
}

async function logout(){
  await userStore.logout();
  await router.push("/")

}
</script>

