<template>
  <div v-if="user" class="max-w-lg mx-auto pt-50 min-h-screen flex flex-col gap-6 p-6 bg-[var(--blanc)] rounded-xl shadow-md">

    <!-- Infos utilisateur -->
    <div class="flex items-center gap-4">
      <img v-if="user.nom_photo" :src="img(user)" class="w-20 h-20 rounded-full object-cover" />
      <div>
        <h1 class="text-2xl font-bold">{{ user.name || user.login }}</h1>
        <p class="text-[var(--grisf)]">{{ user.type || 'Utilisateur' }}</p>
      </div>
    </div>

    <div class="space-y-1 text-[var(--grisf)]">
      <p><span class="font-medium text-[var(--noir)]">Email :</span> {{ user.email }}</p>
      <p><span class="font-medium text-[var(--noir)]">Droit :</span> {{ droitLabel }}</p>
      <p v-if="user.description"><span class="font-medium text-[var(--noir)]">Description :</span> {{ user.description }}</p>
    </div>

    <!-- Notes -->
    <div v-if="user.note?.length" class="text-[var(--grisf)]">
      <span class="font-medium">Moyenne des notes :</span> {{ moyenneNotes }} / 5
    </div>

    <!-- Tickets -->
    <div class="mt-4">
      <span class="font-medium text-[var(--noir)]">Tickets :</span>
      <div v-if="tickets.length" class="mt-2 space-y-2">
        <div v-for="t in tickets" :key="t.idticket" class="p-3 border border-[var(--grisf)] rounded-lg">
          <div class="font-medium">#{{ t.idticket }}</div>
          <div class="text-[var(--grisf)]">{{ t.datefrom }} → {{ t.dateto }}</div>
        </div>
      </div>
      <div v-else class="text-[var(--gris)] text-sm mt-2">Aucun ticket.</div>
    </div>

    <!-- Reservations -->
    <div class="mt-4">
      <span class="font-medium text-[var(--noir)]">Reservations :</span>
      <div v-if="reservations.length" class="mt-2 space-y-2">
        <div v-for="r in reservations" :key="r.id" class="p-3 border border-[var(--grisf)] rounded-lg">
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
      <div v-else class="text-[var(--gris)] text-sm mt-2">Aucune reservations.</div>
    </div>

    <!-- Paniers payés -->
    <div class="mt-4">
      <span class="font-medium text-[var(--noir)]">Commandes goodies :</span>
      <div v-if="paidBaskets.length" class="mt-2 space-y-4">
        <div v-for="basket in paidBaskets" :key="basket.id" class="p-4 border border-[var(--grisf)] rounded-lg">
          <div class="font-medium">Panier du {{ basket.date }}</div>
          <ul class="mt-2 space-y-1">
            <li v-for="item in paidBasketItemsForBasket(basket.id)" :key="item.idgoodie + '-' + item.idcolor + '-' + item.idsize">
              {{ item.name }} ({{ item.color }} / {{ item.size }}) × {{ item.count }} — {{ (item.count * item.price).toFixed(2) }} €
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="text-[var(--gris)] text-sm mt-2">Aucun panier payé.</div>
    </div>

  </div>

  <div v-else class="text-center text-[var(--gris)] mt-10">
    Utilisateur non connecté.
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useGoodiesStore, useTicketsStore, useUserStore, useReservationsStore, useStandsStore } from '@/stores/index.js';

const userStore = useUserStore();
const goodiesStore = useGoodiesStore();
const ticketStore = useTicketsStore();
const reservationStore = useReservationsStore();
const standStore = useStandsStore();

const img = (u) => new URL(`../assets/img/${u.nom_photo}`, import.meta.url).href;

const user = computed(() => userStore.currentUser);

const tickets = computed(() => ticketStore.billets || []);
const reservations = computed(() => reservationStore.reservations);

const droitLabel = computed(() => {
  if (!user.value) return '';
  return user.value.droit === '2' ? 'Administrateur' : user.value.droit === '1' ? 'Prestataire' : 'Client';
});

const moyenneNotes = computed(() => {
  if (!user.value?.note?.length) return 0;
  return (user.value.note.reduce((a, b) => a + b, 0) / user.value.note.length).toFixed(1);
});

// Paniers payés
const paidBaskets = computed(() =>
    goodiesStore.baskets.filter(b => b.state === 'payed' && b.iduser === user.value?.id)
);

// Items pour un panier
const paidBasketItemsForBasket = (idbasket) => {
  return goodiesStore.basketItems
      .filter(i => i.idbasket === idbasket)
      .map(i => ({
        ...i,
        name: goodiesStore.getName(i.idgoodie),
        price: goodiesStore.getPrice(i.idgoodie),
        color: goodiesStore.getColor(i.idcolor),
        size: goodiesStore.getSize(i.idsize)
      }));
};

onMounted(async () => {
  if (!user.value?.id) return;

  await goodiesStore.getAllBasketByUserId(user.value.id);

  // récupère les items pour chaque panier

  await goodiesStore.getAllBasketItems(user.value.id);


  await ticketStore.getBilletsByUserId(user.value.id);
  await reservationStore.getReservationByIdUser(user.value.id);
  await standStore.getStands();

  for (const r of reservations.value) {
    const film = await reservationStore.getFilmFromReservation(r);
    r.filmTitle = film?.title || 'Titre inconnu';
    const stand = await standStore.getStandById(r.standId);
    r.standTitle = stand?.name || 'Titre inconnu';
  }
});
</script>
