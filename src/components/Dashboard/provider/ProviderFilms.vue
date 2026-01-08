<template>
  <div class="provider-films-page p-4 ml-dashboard">
    <h1>{{ t("ProviderFilms.0") }}</h1>

    <!-- Formulaire de création de demande -->
    <section class="mb-8">
      <h2>{{ t("ProviderFilms.1") }}</h2>
      <form @submit.prevent="submitFilmRequest" class="flex flex-col gap-2">
        <input v-model="newFilm.title" placeholder="Titre du film" class="input" required />
        <input v-model="newFilm.release_date" type="date" class="input" required />
        <textarea v-model="newFilm.description" placeholder="Description" class="input" required></textarea>
        <input v-model.number="newFilm.duration" type="number" placeholder="Durée (min)" class="input" required />

        <div class="mb-2">
          <label class="font-bold">{{ t("ProviderFilms.6") }} :</label>
          <div class="flex flex-wrap gap-2 mt-1">
            <button
                v-for="genre in genres"
                :key="genre.id"
                type="button"
                @click="toggleGenre(genre.id)"
                :class="['px-3 py-1 rounded-full border cursor-pointer', selectedGenres.includes(genre.id) ? 'bg-yellow-400 border-yellow-500' : 'bg-white border-gray-300']"
            >
              {{ genre.name }}
            </button>
          </div>
          <p v-if="selectedGenres.length === 2" class="text-sm text-gray-500 mt-1">
            {{ t("ProviderFilms.7") }}
          </p>
        </div>

        <label>{{ t("ProviderFilms.8") }} :</label>
        <input type="file" @change="onFileChange" class="input" />

        <button type="submit" class="btn mt-2">{{ t("ProviderFilms.9") }}</button>
      </form>
    </section>

    <!-- Tableau des demandes en cours -->
    <section class="mb-8">
      <h2>{{ t("ProviderFilms.10") }}</h2>
      <table v-if="myRequests.length" class="w-full border border-gray-300">
        <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">{{ t("ProviderFilms.2") }}</th>
          <th class="p-2 border">{{ t("ProviderFilms.3") }}</th>
          <th class="p-2 border">{{ t("ProviderFilms.12") }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="request in myRequests" :key="request.id">
          <td class="p-2 border">{{ request.title }}</td>
          <td class="p-2 border">{{ request.release_date }}</td>
          <td class="p-2 border">
            <button @click="deleteRequest(request.id)" class="btn bg-red-400">
              {{ t("ProviderFilms.13") }}
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <p v-else>{{ t("ProviderFilms.11") }}</p>
    </section>

    <!-- Tableau des films acceptés -->
    <section>
      <h2>{{ t("ProviderFilms.14") }}</h2>
      <table v-if="myFilms.length" class="w-full border border-gray-300">
        <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">{{ t("ProviderFilms.2") }}</th>
          <th class="p-2 border">{{ t("ProviderFilms.6") }}</th>
          <th class="p-2 border">{{ t("ProviderFilms.3") }}</th>
          <th class="p-2 border">{{ t("ProviderFilms.16") }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="film in myFilms" :key="film.id">
          <td class="p-2 border">{{ film.title }}</td>
          <td class="p-2 border">{{ filmsStore.getGenresOfFilm(film.id).join(', ') }}</td>
          <td class="p-2 border">{{ film.release_date }}</td>
          <td class="p-2 border">
            <div v-for="score in getVotesByFilm(film.id)" :key="score.category">
              {{ score.category }} : {{ score.total_score }}
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <p v-else>{{ t("ProviderFilms.17") }}</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFilmsStore, useVotesStore, useUserStore } from "@/stores";
import { useI18n } from "vue-i18n"

const { t, locale } = useI18n()
const filmsStore = useFilmsStore();
const votesStore = useVotesStore();
const userStore = useUserStore();

const newFilm = ref({
  title: '',
  release_date: '',
  description: '',
  duration: 0,
  poster: ''
});

const selectedGenres = ref([]);
const genres = computed(() => filmsStore.genres);


// Upload de l'affiche (simple placeholder pour l'instant)
const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) newFilm.value.poster = file.name;
}

const toggleGenre = (genreId) => {
  if (selectedGenres.value.includes(genreId)) {
    // Désélectionner
    selectedGenres.value = selectedGenres.value.filter(id => id !== genreId);
  } else {
    // Ajouter seulement si moins de 2 genres sont sélectionnés
    if (selectedGenres.value.length < 2) {
      selectedGenres.value.push(genreId);
    } else {
      alert("Vous ne pouvez sélectionner que 2 genres maximum");
    }
  }
};

const submitFilmRequest = async () => {
  if (selectedGenres.value.length > 2) {
    alert('Vous ne pouvez sélectionner que 2 genres maximum');
    return;
  }
  const payload = {
    ...newFilm.value,
    director_id: userStore.currentUser.id,
    genreIds: selectedGenres.value
  };
  const res = await filmsStore.addFilmRequest(payload);
  if (res.error === 0) {
    alert('Demande envoyée !');
    newFilm.value = {title: '', release_date: '', description: '', duration: 0, poster: ''};
    selectedGenres.value = [];
    console.log(filmsStore.filmsRequests)
    console.log(filmsStore.filmsGenresRequests)
  } else {
    alert('Erreur lors de l\'envoi de la demande');
  }
}

const getVotesByFilm = (filmId) => {
  return votesStore.categories.map(cat => {
    const scoreObj = votesStore.scores.find(s => s.film_id === filmId && s.category_id === cat.id)
    return {
      category: cat.category_name,
      total_score: scoreObj ? scoreObj.total_score : 0
    }
  })
}

const deleteRequest = async (id) => {
  console.log('Suppression de l’id :', id)
  const res = await filmsStore.deleteFilmRequest(id)
  console.log('Résultat du store :', res)
  console.log(filmsStore.filmsRequests)
  if (res.error === 0) {
    alert('Demande supprimée')
  } else {
    alert('Erreur lors de la suppression : ' + res.data)
  }
}

// Filtrage des requêtes et films pour l'utilisateur actuel
const myRequests = computed(() =>
    filmsStore.filmsRequests.filter(r => r.director_id === userStore.currentUser.id)
);

const myFilms = computed(() =>
    filmsStore.films.filter(f => f.director_id === userStore.currentUser.id)
);

// Récupérer les genres d'une requête de film
const getGenresOfRequest = (requestId) => {
  return filmsStore.getGenresOfFilmRequest(requestId);
}

// Récupérer les genres d'un film accepté
const getGenresOfFilm = (filmId) => {
  return filmsStore.getGenresOfFilm(filmId);
}

// Récupérer les votes depuis votesStore
const getVotes = (filmId) => {
  return votesStore.getVotesForFilm(filmId);
}

// Initialisation
onMounted(async () => {
  await Promise.all([
    await filmsStore.init(),
    await filmsStore.getFilmGenres(),
    await votesStore.getCategories(),
    await votesStore.getVotes(),
    await votesStore.getScores(),
    await votesStore.getCategories()
  ]);
});
</script>

<style scoped>
.ml-dashboard {
  margin-left: 250px;
}
.input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: 100%;
}

.btn {
  padding: 0.5rem 1rem;
  background-color: #facc15;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.9;
}

table {
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  text-align: left;
  padding: 0.5rem;
}
</style>
