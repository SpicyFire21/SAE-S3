<template>
  <div v-if="userStore.currentUser" class="max-w-md mx-auto h-screen justify-center flex flex-col p-6 bg-white rounded-xl shadow-md space-y-4">
    <div class="flex items-center space-x-4">
      <img v-if="userStore.currentUser.nom_photo" :src="`/images/${userStore.currentUser.nom_photo}`" alt="Photo utilisateur" class="w-16 h-16 rounded-full object-cover"/>
      <div>
        <h2 class="text-xl font-semibold">{{ userStore.currentUser.name || userStore.currentUser.login }}</h2>
        <p class="text-gray-500">{{ userStore.currentUser.type || 'Utilisateur' }}</p>
      </div>
    </div>

    <p class="text-gray-700"><span class="font-medium">Email:</span> {{ userStore.currentUser.email }}</p>
    <p class="text-gray-700"><span class="font-medium">Droit:</span> {{ userStore.currentUser.droit }}</p>
    <p v-if="userStore.description" class="text-gray-700"><span class="font-medium">Description:</span> {{ userStore.currentUser.description }}</p>

    <div v-if="ticketStore.billets">
      <span class="font-medium text-gray-800">Tickets :</span>
      <ul class="list-disc list-inside text-gray-700">
        <li v-for="(b, index) in ticketStore.billets" :key="index">{{ b }}</li>
      </ul>
    </div>
  </div>

  <div v-else class="text-center text-gray-500 mt-10">
    Utilisateur non trouvé.
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {useUserStore} from "@/stores/index.js";
import {useTicketsStore} from "@/stores/modules/tickets.js";
const userStore = useUserStore();
const ticketStore = useTicketsStore();

onMounted(() => {
  console.log(userStore.currentUser)
  ticketStore.getBilletsByUserId(userStore.currentUser.id)
});
</script>

