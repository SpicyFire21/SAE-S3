<template>
  <div v-if="user" class="max-w-lg mx-auto pt-50 min-h-screen flex flex-col gap-6 p-6 bg-[var(--blanc)] rounded-xl shadow-md">

    <div class="flex items-center gap-4">
      <img
          v-if="user.nom_photo"
          :src="img(user)"
          class="w-20 h-20 rounded-full object-cover"
      />
      <div>
        <h1 class="text-2xl font-bold">
          {{ user.name || user.login }}
        </h1>
        <p class="text-[var(--grisf)]">
          {{ user.type || 'Utilisateur' }}
        </p>
      </div>
    </div>

    <div class="space-y-1 text-[var(--grisf)]">
      <p><span class="font-medium text-[var(--noir)]">Email :</span> {{ user.email }}</p>
      <p><span class="font-medium text-[var(--noir)]">Droit :</span> {{ droitLabel }}</p>
      <p v-if="user.description">
        <span class="font-medium text-[var(--noir)]">Description :</span> {{ user.description }}
      </p>
    </div>

    <!-- NOTES -->
    <div v-if="user.note?.length" class="text-[var(--grisf)]">
      <span class="font-medium">Moyenne des notes :</span>
      {{ moyenneNotes }} / 5
    </div>

    <!-- TICKETS -->
    <div class="mt-4">
      <span class="font-medium text-[var(--noir)]">Tickets :</span>

      <div v-if="tickets.length" class="mt-2 space-y-2">
        <div
            v-for="t in tickets"
            :key="t.idticket"
            class="p-3 border border-[var(--grisf)] rounded-lg"
        >
          <div class="font-medium">#{{ t.idticket }}</div>
          <div class="text-[var(--grisf)]">
            {{ t.datefrom }} → {{ t.dateto }}
          </div>
        </div>
      </div>

      <div v-else class="text-[var(--gris)] text-sm mt-2">
        Aucun ticket.
      </div>
    </div>

    <div class="mt-4">
      <span class="font-medium text-[var(--noir)]">Reservations :</span>

      <div v-if="reservations.length" class="mt-2 space-y-2">
        <div
            v-for="r in reservations"
            :key="r.id"
            class="p-3 border border-[var(--grisf)] rounded-lg"
        >
          <div class="font-medium">Pour : {{ r.filmTitle }}</div>
          {{
            new Date(r.date).toLocaleString('fr-FR', {
              weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
            })
          }}
          <div class="font-medium">Type : {{ r.type }}</div>
          <div class="font-medium">Stand : {{ r.standTitle }}</div>
        </div>
      </div>

      <div v-else class="text-[var(--gris)] text-sm mt-2">
        Aucune reservations.
      </div>
    </div>

  </div>

  <div v-else class="text-center text-[var(--gris)] mt-10">
    Utilisateur non connecté.
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/index.js';
import { useTicketsStore } from '@/stores/modules/tickets.js';
import {useReservationsStore} from "@/stores/modules/reservations.js";
import {useStandsStore} from "@/stores/modules/stands.js";
import {getFilmFromReservation} from "@/services/reservations.service.js";

const userStore = useUserStore();
const ticketStore = useTicketsStore();
const reservationStore = useReservationsStore();
const standStore = useStandsStore();

const img = (u) =>
    new URL(`../assets/img/${u.nom_photo}`, import.meta.url).href;


const user = computed(() => userStore.currentUser);

const tickets = computed(() => ticketStore.billets || []);
const reservations = computed(() => reservationStore.reservations);


const droitLabel = computed(() => {
  if (!user.value) return '';
  return user.value.droit === '2'
      ? 'Administrateur'
      : user.value.droit === '1'
          ? 'Prestataire'
          : 'Client';
});

const moyenneNotes = computed(() => {
  if (!user.value?.note?.length) return 0;
  const n = user.value.note;
  return (n.reduce((a, b) => a + b, 0) / n.length).toFixed(1);
});

onMounted(async () => {
  if (user.value?.id) {
    await ticketStore.getBilletsByUserId(user.value.id);
    await reservationStore.getReservationByIdUser(user.value.id)
    await standStore.getStands();

    // on boucle sur toutes les reservations
    for (const r of reservations.value) {
      const film = await reservationStore.getFilmFromReservation(r);
      r.filmTitle = film?.title || 'Titre inconnu';
      const stand = await standStore.getStandById(r.standId)
      r.standTitle = stand?.name || 'Titre inconnu';
    }
  }
});
</script>

