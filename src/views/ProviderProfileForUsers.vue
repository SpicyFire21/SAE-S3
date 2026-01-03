<template>
  <div class="min-h-screen pt-30 px-6 m-auto" v-if="user">
    <h1 class="text-5xl font-extrabold text-gray-900 mb-10 text-center">Profil du prestataire</h1>
    <div
        class="bg-white shadow-2xl rounded-3xl border border-gray-200 p-10 flex flex-col items-center w-full max-w-2xl m-auto transition-transform hover:scale-105 duration-300">
      <div class="relative">
        <img
            :src="getProfilePicture(user.nom_photo)"
            class="w-32 h-32 rounded-full object-cover ring-8 ring-yellow-400 shadow-xl"
        />
        <div class="absolute -bottom-2 right-2 bg-green-400 w-5 h-5 rounded-full border-2 border-white"></div>
      </div>
      <h2 class="mt-6 text-2xl font-bold text-gray-900">{{ user.name }}</h2>
      <RatingStars :user-id="user.id" class="mt-3"/>
      <h4 v-html="user.description" class="mt-6 text-1xl text-gray-600"></h4>
      <button
          :disabled="!userStore.currentUser || userStore.currentUser.id === user.id"
          class="disabled:cursor-not-allowed disabled:opacity-50 mt-3 bg-yellow-400 text-white px-6 py-3 rounded-2xl font-semibold text-base shadow-md hover:shadow-lg hover:bg-yellow-500 cursor-pointer text-center"
          @click="openCommentModal">
        Donner un avis
      </button>
      <h3 v-if="!userStore.currentUser" class="text-red-300 mt-4">Connectez vous
        pour donner un avis
      </h3>
      <h3 v-if="userStore.currentUser && userStore.currentUser.id === user.id" class="text-red-300 mt-4">Vous ne pouvez pas voter pour vous même</h3>
    </div>

    <div class="mt-10 max-w-4xl mx-auto">
      <h3 class="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-900 inline-block mx-auto pb-1">
        Liste des stands
      </h3>


      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" v-if="standsUser">
        <div
            v-for="stand in standsUser"
            :key="stand.idstand"
            class="bg-white border border-yellow-200 rounded-2xl shadow-md p-6
             hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div class="flex justify-between items-center mb-3">
              <h4 class="text-lg font-bold text-gray-900 truncate">
                {{ stand.name }}
              </h4>
              <span class="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 font-medium">
            {{ standStore.getStandTypeByIdForProvider(stand.type).type }}
          </span>
            </div>
          </div>

          <button
              class="mt-auto px-4 py-2 rounded-xl
               bg-black text-yellow-300
               hover:bg-yellow-400 hover:text-black
               transition-all duration-300
               shadow-sm hover:shadow-lg
               flex items-center justify-center cursor-pointer"
              @click="goToStand(stand.idstand)"
          >
            👉 En savoir plus
          </button>
        </div>
      </div>



      <div v-if="standsUser.length === 0">
        <h3 class="text-1xl text-gray-400 mb-6 mx-auto pb-1">
          Ce prestataire ne possède aucun stand.
        </h3>
      </div>
      <div class="flex justify-between items-center mb-4 mt-20">
        <h3 class="text-2xl font-bold text-gray-800 border-b border-gray-900 inline-block pb-1">
          Liste des commentaires
        </h3>

<!--        filtre pomme-->
        <div class="flex items-center gap-2">
          <label for="sortDate" class="text-gray-700 font-medium">Trier par :</label>
          <select
              id="sortDate"
              v-model="commentsSortOrder"
              class="border border-gray-300 rounded-xl px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="newest">Les plus récents</option>
            <option value="oldest">Les plus anciens</option>
          </select>
        </div>


      </div>
      <div v-if="commentsUser.length !== 0" class="space-y-4 mt-6">
        <div
            v-for="comment in sortedComments"
            :key="comment.id"
            class="bg-white border border-yellow-200 rounded-2xl shadow-md p-5"
        >
          <div class="flex justify-between items-center mb-2">
            <h4 class="font-semibold text-gray-900 flex items-center gap-2">
              💬 Commentaire
            </h4>

            <span class="text-sm text-gray-400">
        {{ formatDate(comment.date) }}
      </span>
          </div>
          <p class="text-gray-700 leading-relaxed">
            {{ comment.content }}
          </p>
        </div>
      </div>
      <div v-else class="text-1xl text-gray-400 mb-6 mx-auto pb-1 mt-3">
        Cette utilisateur n'a aucun commentaires.
      </div>
    </div>
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div class="bg-white rounded-3xl p-8 w-[430px] shadow-2xl relative border border-gray-200">
        <button
            @click="closeCommentModal"
            class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl">
          ✕
        </button>
        <h2 class="text-2xl font-extrabold text-gray-900 mb-5 text-center">
          Ajouter un commentaire
        </h2>
        <div class="flex flex-col items-center gap-2 mb-4">
          <p class="text-gray-700 font-medium">Votre note (optionnel)</p>
          <RankingStars v-model="newNoteBase.value"/>
        </div>
        <textarea
            v-model="newCommentBase.content"
            class="w-full min-h-32 p-4 rounded-2xl border border-gray-300 outline-none
               focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
               text-gray-700 placeholder-gray-400"
            placeholder="Ton commentaire...">
        </textarea>
        <div class="flex justify-end gap-3 mt-6">
          <button
              @click="closeCommentModal"
              class="px-5 py-2 rounded-xl border border-gray-300 text-gray-700
                hover:bg-gray-100">
            Annuler
          </button>
          <button
              @click="addOpinion"
              class="px-6 py-2 rounded-xl bg-black text-[var(--jaune)]
                 hover:bg-[var(--jaune)] hover:text-black
                 font-semibold shadow-md hover:shadow-lg">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useStandsStore, useUserStore} from "@/stores/index.js";
import RatingStars from "@/components/Dashboard/provider/ProviderProfile/RatingStars.vue";
import ProfileEditor from "@/components/Dashboard/provider/ProviderProfile/ProfileEditor.vue";
import {useRoute} from "vue-router";
import router from "@/router/index.js";
import {useCommentsStore} from "@/stores/modules/comments.js";
import RankingStars from "@/components/Accueil/RankingStars.vue";

const userStore = useUserStore();
const commentStore = useCommentsStore();
const standStore = useStandsStore();

const route = useRoute();
const id = route.params.id;

onMounted(async () => {
  await userStore.getUsers();
  await userStore.getNotes();
  await userStore.getProviders();
  await standStore.getStandsTypes();
  await standStore.getStands();
  await commentStore.getComments();
  standsUser.value = standStore.stands.filter(s => s.owner === user.value.id);
});

const goToStand = (id) => {
  const selectedStand = standStore.stands.find(stand => stand.idstand === id)
  standStore.setSelectedStand(selectedStand)
  router.push({name: 'StandDetails', params: {id}})
}

const standsUser = ref([])
const commentsUser = computed(() =>
    commentStore.comments.filter(c => c.userId === user.value.id)
)
const user = computed(() => userStore.getUserById(id));
const isModalOpen = ref(false);

const newCommentBase = ref({
  userId: id,
  content: "",
  date: "",
})

const newNoteBase = ref({
  userId: id,
  value: ""
})

const openCommentModal = async () => {
  isModalOpen.value = true;
}

const closeCommentModal = async () => {
  isModalOpen.value = false;
}

const addOpinion = async () => {
  if (newCommentBase.value.content !== "") {
    newCommentBase.value.date = new Date().toISOString()
    await commentStore.addComment(newCommentBase.value);
    if (newNoteBase.value.value !== "") {
      newNoteBase.value.value = String(newNoteBase.value.value)
      await userStore.addNote(newNoteBase.value);
    }
    newCommentBase.value.date = ""
    newCommentBase.value.content = ""
    newNoteBase.value.value = ""
    isModalOpen.value = false;
  }
}

const formatDate = (date) =>
    new Date(date).toLocaleString('fr-FR', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })

const getProfilePicture = (fileName) => new URL(`../assets/img/${fileName}`, import.meta.url).href;

const commentsSortOrder = ref("newest"); // "newest" ou "oldest" selon le filtre choisi

const sortedComments = computed(() => {
  const sorted = [...commentsUser.value];
  if (commentsSortOrder.value === "newest") {
    return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else {
    return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
});

</script>
