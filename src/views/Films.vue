<template>
  <div>
    <div
        v-if="threeMostRecentFilms.length"
        class="filmintroduction-container relative overflow-hidden w-full"
    >
      <div
          class="flex transition-transform duration-700 ease-in-out"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
            v-for="film in threeMostRecentFilms"
            :key="film.id"
            class="min-w-full h-full relative"
        >
          <div
              class="absolute bottom-20 left-4 bg-black/30 p-4 mb-22 rounded ml-15"
          >
            <h1 class="text-[54px] font-bold text-white">
              Découvrez nos sorties les plus récentes
            </h1>
            <h2 class="text-xl font-bold text-[var(--jaune)] text-[40px]">
              {{ film.title }}
            </h2>
            <div class="flex gap-2 my-2">
              <span
                  v-for="genre in filmsStore.getGenresOfFilm(film.id)"
                  :key="genre"
                  class="text-[var(--noir)] bg-[var(--jaune)] px-2 py-0.5 rounded-full text-xs font-medium">
                {{ genre }}
              </span>
            </div>
          </div>

          <button @click="goToDetails(film.id)" class="absolute bottom-4 bg-[var(--jaune)] text-[var(--noir)] py-2 px-4 rounded-md hover:brightness-110 transition left-1/2">
            {{ t('cardlist.learnMore') }}
          </button>

          <img
              :src="getFilmImage(film.poster)"
              :alt="film.title"
              class="h-[550px] w-full object-cover"
          />
        </div>
      </div>

      <button
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
      >
        ◀
      </button>
      <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
      >
        ▶
      </button>
    </div>

    <div v-for="genre in categories" :key="genre.id" class="pt-10">
      <FilmCarousel
          :get-director-name="getDirectorName"
          :category="genre.name"
          :films="filmsStore.getFilmsOfGenre(genre.id)"
      />
    </div>
  </div>
</template>

<script setup>
import FilmCarousel from "@/components/FilmCarousel.vue";
import { onMounted, computed, ref } from "vue";
import { useFilmsStore } from "@/stores/modules/films.js";
import { useUserStore } from "@/stores/index.js";
import { useI18n } from 'vue-i18n'
import router from "@/router/index.js";

const { t } = useI18n()

const filmsStore = useFilmsStore();
const userStore = useUserStore();

const getDirectorName = (director_id) => {
  const director = userStore.providers.find((user) => user.id === director_id);
  return director ? director.name : "Directeur inconnu";
};

onMounted(async () => {
  await filmsStore.getFilms();
  await filmsStore.getFilmGenres();
  await filmsStore.getGenres();
  await filmsStore.getFilmCast();
  await userStore.getProviders();
  setInterval(() => {
    nextSlide();
  }, 4000);
});

const threeMostRecentFilms = computed(() => {
  if (!filmsStore.films.length) return [];
  return [...filmsStore.films]
      .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
      .slice(0, 3);
});

const categories = computed(() => filmsStore.genres);

const getFilmImage = (fileName) =>
    new URL(`../assets/img/${fileName}`, import.meta.url).href;

const currentSlide = ref(0);

const nextSlide = () => {
  currentSlide.value =
      (currentSlide.value + 1) % threeMostRecentFilms.value.length;
};

const prevSlide = () => {
  currentSlide.value =
      (currentSlide.value - 1 + threeMostRecentFilms.value.length) %
      threeMostRecentFilms.value.length;
};

function goToDetails(id) {
  router.push({ name: 'FilmDetails', params: { id } })
}

</script>
