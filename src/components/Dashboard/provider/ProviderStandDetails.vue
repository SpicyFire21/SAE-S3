<template>
  <div v-if="stand && typeStand && stand.owner === userStore.currentUser.id"
       class="pl-64 pt-10 min-h-screen m-auto text-gray-900">
    <div class="max-w-5xl mx-auto mb-12">
      <h1 class="text-5xl font-extrabold tracking-tight mb-4 text-yellow-500">{{ stand.name }}</h1>
      <p class="text-xl font-semibold text-gray-700">Type: {{ typeStand.type }}</p>
    </div>

    <div class="max-w-5xl mx-auto space-y-12">
      <ProjectionsList
          v-if="stand.type === '1'"
          :standId="id"
          @delete-projection="deleteFilmProjection"
      />

      <AutographsList
          v-else-if="stand.type === '2'"
          :standId="id"
          @delete-autograph="deleteAutograph"
      />
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {useStandsStore, useUserStore, useFilmsStore, useAutographsStore} from "@/stores/index.js";
import ProjectionsList from "@/components/Dashboard/provider/StandsListPerTypes/ProjectionsList.vue";
import AutographsList from "@/components/Dashboard/provider/StandsListPerTypes/AutographsList.vue";

const standStore = useStandsStore();
const filmStore = useFilmsStore();
const autographStore = useAutographsStore();
const userStore = useUserStore();

const route = useRoute();
const id = route.params.id;

const stand = ref(null);
const typeStand = ref(null);

onMounted(async () => {
  await userStore.getUsers();
  await userStore.getProviders();
  await filmStore.getGenres();
  await filmStore.getFilmGenres();
  await filmStore.getFilms();
  await filmStore.getProjections();
  await autographStore.getAutograph();


  stand.value = await standStore.getStandById(id);
  typeStand.value = await standStore.getStandTypeById(stand.value.type);
});

const deleteFilmProjection = async (projection) => {
  await filmStore.deleteProjection(projection);
};

const deleteAutograph = async (autograph) => {
  await autographStore.deleteAutograph(autograph);
};
</script>
