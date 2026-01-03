<template>
  <div class="min-h-screen pl-64 pt-20 px-6 m-auto" v-if="user">
    <h1 class="text-5xl font-extrabold text-gray-900 mb-10">Mon profil prestataire</h1>

    <div class="bg-white shadow-2xl rounded-3xl border border-gray-200 p-10 flex flex-col items-center w-full max-w-2xl m-auto transition-transform hover:scale-105 duration-300">

      <div class="relative">
        <img
            :src="previewTemp || getProfilePicture(user.nom_photo)"
            class="w-32 h-32 rounded-full object-cover ring-8 ring-yellow-400 shadow-xl"
        />

        <label v-if="editing" class="absolute -bottom-2 right-2 cursor-pointer bg-yellow-400 text-white w-10 h-10 rounded-full flex items-center justify-center border-2 border-white">
          ✎
          <input type="file" accept="image/*" class="hidden" @change="onImageSelected">
        </label>

        <div v-else class="absolute -bottom-2 right-2 bg-green-400 w-5 h-5 rounded-full border-2 border-white"></div>
      </div>

      <h2 class="mt-6 text-2xl font-bold text-gray-900">{{ user.name }}</h2>
      <RatingStars :user-id="user.id" class="mt-3"/>

      <div class="mt-4 w-full">
        <p v-if="!editing" class="text-center text-gray-600 text-base leading-relaxed" v-html="user.description"></p>
        <ProfileEditor v-else @saved="onDescriptionSaved" @cancel="editing = false" :initial-content="user.description"/>
      </div>

      <div class="mt-6 flex justify-center gap-4 w-full">
        <div class="bg-yellow-400 text-white px-6 py-3 rounded-2xl font-semibold text-base shadow-md hover:shadow-lg text-center">
          Stands réservés: {{ nbStands }}
        </div>

        <button
            v-if="!editing"
            @click="editing = true"
            class="bg-yellow-400 text-white px-6 py-3 rounded-2xl font-semibold text-base shadow-md hover:shadow-lg hover:bg-yellow-500 cursor-pointer text-center">
          Modifier la description
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStandsStore, useUserStore } from "@/stores/index.js";
import RatingStars from "@/components/Dashboard/provider/ProviderProfile/RatingStars.vue";
import ProfileEditor from "@/components/Dashboard/provider/ProviderProfile/ProfileEditor.vue";

const userStore = useUserStore();
const standStore = useStandsStore();

onMounted(async () => {
  await userStore.getUsers();
  await userStore.getNotes();
  await userStore.getProviders();
  await standStore.getStandsTypes();
  await standStore.getStands();
});

const editing = ref(false);
const previewTemp = ref("");

const user = computed(() => userStore.getUserById(userStore.currentUser.id));
const nbStands = computed(() => standStore.stands.filter(s => s.owner === user.value.id).length);

const getProfilePicture = (fileName) => new URL(`../../../assets/img/${fileName}`, import.meta.url).href;
const previewImage = ref(null);

const onDescriptionSaved = async (newContent) => {
  user.value.description = newContent;
  if (previewImage.value) {
    user.value.nom_photo = previewImage.value;
    console.log("test image:" + previewImage.value)
    previewImage.value = null;
    previewTemp.value = "";
  }
  editing.value = false;
};

const onImageSelected = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  previewImage.value = file.name;
  const reader = new FileReader();
  reader.onload = (e) => {
    previewTemp.value = e.target.result;
  };
  reader.readAsDataURL(file);
};
</script>
