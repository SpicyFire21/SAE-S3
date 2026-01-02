<template>
  <div>
    <div class="flex justify-between items-center mb-6 border-b-2 border-yellow-500 pb-2">
      <h2 class="text-3xl font-bold text-gray-900">Films</h2>
      <button
          class="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-900 transition"
          @click="addProjection"
      >
        Ajouter une projection
      </button>
    </div>

    <div
        v-for="pr in projectionsWithFilms"
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
            @click="editProjection(pr)"
        >
          Modifier la projection
        </button>
        <button
            class="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-900 transition"
            @click="$emit('delete-projection', pr)"
        >
          Supprimer
        </button>
      </div>
    </div>

    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl w-[500px]">
        <h2 class="text-2xl font-bold mb-4">Modifier la projection</h2>
        <div class="space-y-3">
          <div>
            <label class="font-semibold">Date</label>
            <input type="datetime-local" v-model="filmStore.selectedProjection.date" class="border p-2 rounded w-full">
          </div>
          <div>
            <label class="font-semibold">Film</label>
            <select v-model="filmStore.selectedProjection.filmId" class="border p-2 rounded w-full">
              <option v-for="film in filmStore.films" :key="film.id" :value="film.id">{{ film.title }}</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end gap-3 mt-6">
          <button class="px-4 py-2 bg-[var(--bleu)] text-white rounded hover:bg-[var(--bleu)]/90" @click="closeModal">Annuler</button>
          <button class="px-4 py-2 bg-[var(--jaune)] text-white rounded hover:bg-[var(--jaune)]/80 text-white rounded" @click="saveEditProjection">Sauvegarder</button>
        </div>
      </div>
    </div>

    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl w-[500px]">
        <h2 class="text-2xl font-bold mb-4">Ajouter une projection</h2>
        <div class="space-y-3">
          <div>
            <label class="font-semibold">Date</label>
            <input type="datetime-local" v-model="newProjectionBase.date" class="border p-2 rounded w-full">
          </div>
          <div>
            <label class="font-semibold">Film</label>
            <select v-model="newProjectionBase.filmId" class="border p-2 rounded w-full">
              <option v-for="film in filmStore.films" :key="film.id" :value="film.id">{{ film.title }}</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end gap-3 mt-6">
          <button class="px-4 py-2 bg-[var(--bleu)] text-white rounded hover:bg-[var(--bleu)]/90" @click="closeModal">Annuler</button>
          <button class="px-4 py-2 bg-[var(--jaune)] text-white rounded hover:bg-[var(--jaune)]/80 text-white rounded" @click="saveAddProjection">Ajouter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from "vue";
import {useFilmsStore, useUserStore} from "@/stores/index.js";

const props = defineProps({
  standId: String
});

const newProjectionBase = ref({
  standId: props.standId,
  filmId: "",
  date: ""
})

const filmStore = useFilmsStore();
const userStore = useUserStore();
const showEditModal = ref(false);
const showAddModal = ref(false);

const projectionsWithFilms = computed(() =>
    filmStore.projections
        .filter(p => p.standId === props.standId)
        .map(pr => {
          const film = filmStore.getFilmByIdForProvider(pr.filmId);
          const genres = filmStore.getGenresOfFilm(pr.filmId);
          return { ...pr, film, genres };
        })
);

const editProjection = (projection) => {
  filmStore.setSelectedProjection({ ...projection }); // crée un clone
  showEditModal.value = true;
};

const addProjection = () => {
  showAddModal.value = true;
}

const saveEditProjection = async () => {
  await filmStore.updateProjection(filmStore.selectedProjection);
  showEditModal.value = false;
};

async function saveAddProjection() {
  if (newProjectionBase.value.date === "" || newProjectionBase.value.filmId === "") {
    showAddModal.value = false;
    return;
  }
  await filmStore.addProjection(newProjectionBase.value)
  showAddModal.value = false;
  newProjectionBase.value.date = ""
  newProjectionBase.value.filmId = ""
}

const closeModal = () => {
  filmStore.setSelectedProjection(null);
  showEditModal.value = false;
  showAddModal.value = false
};

const formatGenre = (genres) => (genres && genres.length ? genres.join(", ") : "Aucun genre");

const formatDuration = (minutes) => {
  if (!minutes) return "0h 0min";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}min`;
};

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleString('fr-FR', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};
</script>
