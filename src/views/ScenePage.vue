<template>
  <div class="min-h-screen bg-[var(--blanc)] p-25">
    <h1 class="text-3xl font-bold text-center mb-10 tracking-widest">
      {{ t('scenePage.mainStageTitle') }}
    </h1>

    <!-- Liste des films -->
    <section class="max-w-screen-xl mx-auto grid md:grid-cols-3 gap-6">
      <div
          v-for="film in filmsStore.films"
          :key="film.id"
          class="bg-[var(--gris)] rounded-2xl shadow-lg p-5 flex flex-col gap-3"
      >
        <img
            :src="getFilmImage(film.poster)"
            :alt="film.title"
            class="rounded-xl w-full h-80 object-cover shadow-md"
        />

        <h2 class="text-xl font-semibold text-center tracking-wide">
          {{ film.title }}
        </h2>

        <p class="text-sm text-center text-[var(--grisf)]">
          🎭 {{ t('scenePage.genres') }} :
          {{ filmsStore.getGenresOfFilm(film.id).join(', ') || t('scenePage.notSpecified') }}
        </p>

        <button
            v-if="votesStore.votingOpen"
            @click="openVoteModal(film)"
            class="mt-auto bg-[var(--jaune)] px-4 py-2 rounded-xl font-bold tracking-widest shadow-md hover:scale-105 transition"
        >
          🗳 {{ t('scenePage.vote') }}
        </button>

        <span
            v-else
            class="text-red-600 font-medium italic"
        >
          {{ t('scenePage.votesDisabled') }}
        </span>

        <div v-if="!userStore.currentUser" class="text-center text-red-600 font-semibold mt-6">
          {{ t('scenePage.loginToVote') }}
        </div>
      </div>
    </section>

    <!-- Modal de vote -->
    <VoteModal
        v-if="showModal"
        :film="selectedFilm"
        :categories="categories"
        @close="showModal = false"
        @submitVote="submitVote"
        @removeVote="removeVote"
    />

    <!-- Classement -->
    <section class="mt-15 max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold text-center underline mb-6">
        🏆 {{ t('scenePage.ranking') }} 🏆
      </h2>

      <div
          v-for="cat in categories"
          :key="cat"
          class="mb-10 bg-[var(--gris)] p-4 rounded-2xl shadow-md"
      >
        <h3 class="text-xl font-semibold mb-3 tracking-widest">
          {{ cat }}
        </h3>

        <ul v-if="votesStore.getRanking(cat).length">
          <li
              v-for="item in votesStore.getRanking(cat)"
              :key="item.filmId"
              class="flex justify-between border-b py-2 tracking-wide"
          >
            <span>{{ item.title }}</span>
            <span class="font-bold">{{ item.score }} {{ t('scenePage.points') }}</span>
          </li>
        </ul>

        <p v-else class="text-sm text-[var(--grisf)] text-center">
          {{ t('scenePage.noVotesYet') }}
        </p>
      </div>
    </section>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import { useFilmsStore, useVotesStore, useUserStore } from "@/stores"
import VoteModal from '@/components/ScenePrincipal/VoteModal.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const filmsStore = useFilmsStore()
const votesStore = useVotesStore()
const userStore = useUserStore()

const showModal = ref(false)
const selectedFilm = ref(null)

// --- Lifecycle ---
onMounted(async () => {
  await filmsStore.init()
  await votesStore.getCategories()
  await votesStore.getVotes()
  await votesStore.getScores()
})

const categories = computed(() => votesStore.categories.map(c => c.category_name))

// --- Helpers ---
const getFilmImage = (fileName) =>
    new URL(`../assets/img/${fileName}`, import.meta.url).href

const openVoteModal = (film) => {
  if (!userStore.currentUser) {
    alert(t('scenePage.loginToVote'))
    return
  }
  console.log(filmsStore.getGenresOfFilm(film.id).join(', '))
  console.log(" votes au debut :", JSON.parse(JSON.stringify(votesStore.votes)))
  selectedFilm.value = film
  showModal.value = true
}

const submitVote = async ({ filmId, category, userId }) => {
  const cat = votesStore.categories.find(c => c.category_name === category)
  if (!cat) {
    alert(t('scenePage.votingClosed'))
    return
  }

  const res = await votesStore.AddVote({
    userId,
    filmId,
    category_id: cat.id
  })

  if (res.error === 0) {
    await votesStore.updateScore({ film_id: filmId, category_id: cat.id }, 1)
  } else {
    alert(res.data)
  }
}

const removeVote = async ({ filmId, category, userId }) => {
  const cat = votesStore.categories.find(c => c.category_name === category)
  if (!cat) return

  const res = await votesStore.removeVote({ userId, category_id: cat.id })

  //console.log("Résultat du store.removeVote :", res)

  if (res.error === 0) {
    await votesStore.updateScore({ film_id: filmId, category_id: cat.id }, -1)
  }
}

</script>
