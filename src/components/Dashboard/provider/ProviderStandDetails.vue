<template>
  <div v-if="stand && typeStand" class="pl-64 pt-10 min-h-screen m-auto text-gray-900">
    <div class="max-w-5xl mx-auto mb-12">
      <h1 class="text-5xl font-extrabold tracking-tight mb-4 text-yellow-500">{{ stand.name }}</h1>
      <p class="text-xl font-semibold text-gray-700">Type: {{ typeStand.type }}</p>
    </div>

    <div class="max-w-5xl mx-auto space-y-12">
      <div v-if="stand.type === '1'">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-yellow-500 pb-2">Films</h2>

        <div
            v-for="pr in standProjectionsWithFilms"
            :key="pr.id"
            class="bg-white shadow-2xl rounded-3xl p-8 m-8 hover:shadow-yellow-400/30 transition-all duration-300 border border-yellow-200/20 backdrop-blur-md"
        >
          <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <h3 class="text-2xl font-bold text-gray-900 mb-2 md:mb-0">{{ pr.film.title }}</h3>
            <span class="text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
              Durée: {{ formatDuration(pr.film.duration) }}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-4">
            <p><span class="font-semibold">Réalisateur:</span> {{ userStore.getUserById(pr.film.director_id).name }}</p>
            <p><span class="font-semibold">Genres:</span> {{ formatGenre(pr.genres) }}</p>
            <p><span class="font-semibold">Date de projection:</span> {{ formatDate(pr.date) }}</p>
          </div>

          <div class="flex justify-end gap-3">
            <button
                class="px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-900 transition"
                @click="editFilmProjection(pr)"
            >
              Modifier la projection
            </button>
            <button
                class="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-900 transition"
                @click="deleteFilmProjection(pr)"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
      <div v-else-if="stand.type === '2'">
        <h2 class="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-yellow-500 pb-2">Dédicaces</h2>
        <div
            v-for="aut in standAutographWithUser"
            :key="aut.id"
            class="bg-white shadow-2xl rounded-3xl p-8 m-8 hover:shadow-yellow-400/30 transition-all duration-300 border border-yellow-200/20 backdrop-blur-md"
        >
          <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <h3 class="text-2xl font-bold text-gray-900 mb-2 md:mb-0">{{ aut.user.name }}</h3>
            <span class="text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
              Pendant: {{ formatDuration(aut.duration) }}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-4">
            <p><span class="font-semibold">Date de présence du prestataire:</span> {{ formatDate(aut.beginDate) }}</p>
          </div>

          <div class="flex justify-end gap-3">
            <button
                class="px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-900 transition"
                @click="editAutograph(aut)"
            >
              Modifier la dédicace
            </button>
            <button
                class="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-900 transition"
                @click="deleteAutograph(aut)"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useFilmsStore} from "@/stores/modules/films.js";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useReservationsStore, useStandsStore, useUserStore} from "@/stores/index.js";
import {reservations} from "@/datasource/data.js";
import {useAutographsStore} from "@/stores/modules/autographs.js";

const standStore = useStandsStore()
const filmStore = useFilmsStore()
const reservationStore = useReservationsStore()
const userStore = useUserStore()
const autographStore = useAutographsStore()

const route = useRoute();
const id = route.params.id;

const stand = ref(null)
const typeStand = ref(null)
const user = ref(null)

const standProjectionsWithFilms = computed(() => {
  return filmStore.projections
      .filter(p => p.standId === id)
      .map(pr => {
        const film = filmStore.getFilmByIdForProvider(pr.filmId);
        const genres = filmStore.getGenresOfFilm(pr.filmId)
        return { ...pr, film, genres };
      });
});

const standAutographWithUser = computed(() => {
  return autographStore.autographs
      .filter(a => a.standId === id)
      .map(aut => {
        const user = userStore.getUserById(aut.userId);
        return { ...aut, user}
      })
})

// les deux fonctions qui map les infos on évite a chaque fois de faire un get by id a chaque fois qu'on veut par exemple appelé le user ou les genres du film


const formatGenre = (genres) => {
  if (!genres || !genres.length) return "Aucun genre";
  return genres.join(", ");
  // genres.join crée une liste de tout les éléments separé par la chaine de caractere en param donc ","
};



onMounted(async () => {
  await userStore.getUsers();
  await standStore.getStands();
  await standStore.getStandsTypes();
  await filmStore.getProjections()
  await filmStore.getFilmGenres();
  await filmStore.getGenres();
  await filmStore.getFilms();
  await reservationStore.getAutographsReservations();
  await autographStore.getAutograph();
  stand.value = await standStore.getStandById(id);
  typeStand.value = await standStore.getStandTypeById(stand.value.type);
  user.value = await userStore.getUserById(stand.value.owner);
});

const formatDuration = (minutes) => {
  if (!minutes) return "0h 0min";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}min`;
};

async function deleteFilmProjection(projection) {
  await filmStore.deleteProjection(projection);
}

async function deleteAutograph(autograph) {
  await autographStore.deleteAutograph(autograph);
}

async function editFilmProjection(projection) {

}

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};


</script>

<style scoped>
</style>
