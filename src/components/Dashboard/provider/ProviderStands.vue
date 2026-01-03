<template>
  <div class="mt-10 m-auto text-center pl-64 pt-10">

  <h1 class="text-[32px] font-bold">Carte interactive de l'événement :</h1>
    <InteractiveMap/>

    <div class="mt-10 px-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">
        Mes Stands
      </h1>

      <!-- filtres -->
      <div class="m-6 flex gap-4 items-center">
        <input
            v-model="search"
            placeholder="Rechercher un stand..."
            class="border rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <select
            v-model="typeFilter"
            class="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Tous</option>
          <option
              v-for="type in standStore.standsTypes"
              :key="type.id"
              :value="type.id"
          >
            {{ type.type }}
          </option>
        </select>
      </div>

      <div
          v-for="stand in filteredStands"
          :key="stand.idstand"
      >
        <div
            v-if="stand.owner === userStore.currentUser.id"
            class="bg-white border border-yellow-300/40 rounded-2xl shadow-md mb-6 p-6
             hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div class="flex justify-between items-center mb-3">
            <h2 class="text-xl font-bold text-gray-900">
              {{ stand.name }}
            </h2>

            <span class="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 font-medium">
              {{ standStore.getStandTypeByIdForProvider(stand.type).type }}
            </span>
          </div>

          <p class="text-gray-600 mb-5">
            Ce stand est sous votre gestion. Vous pouvez y configurer vos projections,
            gérer vos activités et suivre son statut.
          </p>

          <div class="flex justify-end">
            <button
                class="px-5 py-2 rounded-xl
               bg-black text-yellow-300
               hover:bg-yellow-400 hover:text-black
               transition-all duration-300
               shadow-sm hover:shadow-lg
               flex justify-end cursor-pointer"
                @click="editStand(stand.idstand)"
            >
              📝 Modifier
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>


<script setup>
import InteractiveMap from "@/components/Accueil/InteractiveMap.vue";
import {useReservationsStore, useStandsStore, useUserStore} from "@/stores/index.js";
import {computed, onMounted, ref} from "vue";
import router from "@/router/index.js";


const standStore = useStandsStore()
const userStore = useUserStore()

onMounted(async () => {
  await userStore.getUsers();
  await standStore.getStandsTypes();
  await standStore.getStands();
});

async function editStand(id) {
  await router.push({name: 'ProviderStandDetails', params: {id}})
}

const search = ref("");
const typeFilter = ref("");

const filteredStands = computed(() =>
    standStore.stands.filter(s =>
        s.name.toLowerCase().includes(search.value.toLowerCase()) &&
        (typeFilter.value === "" || s.type === typeFilter.value)
    )
);

</script>


<style scoped>

</style>