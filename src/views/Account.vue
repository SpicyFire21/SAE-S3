<template>
  <div v-if="user" class="max-w-3xl mx-auto pt-32 min-h-screen p-6">

    <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">

      <div class="flex flex-col md:flex-row md:items-center gap-6 border-b pb-6">

        <img
            v-if="user.nom_photo"
            :src="img(user)"
            class="w-24 h-24 rounded-full object-cover ring-4 ring-[var(--jaune)] shadow-md"
        />

        <div>
          <h1 class="text-3xl font-extrabold text-gray-900">
            {{ user.name || user.login }}
          </h1>
          <p class="text-gray-500 text-sm">
            {{ user.type || 'Utilisateur' }}
          </p>

          <div
              class="inline-block mt-3 px-4 py-1 text-sm rounded-full font-medium
            bg-[var(--jaune)] text-black shadow-sm"
          >
            {{ droitLabel }}
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6 mt-6">
        <div class="space-y-2">
          <p><span class="font-semibold text-gray-900">Email :</span> {{ user.email }}</p>
          <p><span class="font-semibold text-gray-900">Droit :</span> {{ droitLabel }}</p>

          <p v-if="user.description">
            <span class="font-semibold text-gray-900">Description :</span>
            {{ user.description }}
          </p>
        </div>

        <div v-if="user.note?.length" class="bg-gray-50 border rounded-xl p-4">
          <p class="font-semibold text-gray-900">Moyenne des notes</p>
          <p class="text-3xl font-extrabold text-yellow-500">
            {{ moyenneNotes }} <span class="text-gray-600 text-lg">/ 5</span>
          </p>
        </div>
      </div>

      <div class="mt-10 space-y-10">

        <section>
          <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
            🎟️ Tickets
          </h2>

          <div v-if="tickets.length" class="mt-4 grid md:grid-cols-2 gap-4">
            <div
                v-for="t in tickets"
                :key="t.idticket"
                class="p-4 bg-gray-50 border rounded-xl shadow-sm"
            >
              <div class="font-bold">#{{ t.idticket }}</div>
              <div class="text-gray-500 text-sm">
                {{ t.datefrom }} → {{ t.dateto }}
              </div>
            </div>
          </div>

          <p v-else class="text-gray-400 mt-2">Aucun ticket.</p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
            📅 Réservations
          </h2>

          <div v-if="reservations.length" class="mt-4 grid md:grid-cols-2 gap-4">
            <div
                v-for="r in reservations"
                :key="r.id"
                class="p-4 bg-gray-50 border rounded-xl shadow-sm"
            >
              <div v-if="r.type === '1'">
                <h2 class="text-xl font-bold text-gray-900 flex items-center justify-center gap-2 pb-5">
                  Film
                </h2>
<!--                absolute cinema-->
                <p class="font-semibold">Film: {{ r.filmTitle }}</p>
              <p class="text-gray-500 text-sm">
                {{
                  new Date(r.date).toLocaleString('fr-FR', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                }}
              </p>

              <p class="mt-1 text-sm">
                <span class="font-medium">Type :</span> {{ r.typeTitle }}
              </p>

              <p class="text-sm">
                <span class="font-medium">Stand :</span> {{ r.standTitle }}
              </p>
            </div>
              <div v-else-if="r.type === '2'">
                <h2 class="text-xl font-bold text-gray-900 flex items-center justify-center gap-2 pb-5">
                  Dédicace
                </h2>
                <!-- star extremement importante du cinema et a notre festival bien sur -->
                <p class="font-semibold">Star: {{ r.starName }}</p>
                <p class="text-gray-500 text-sm">
                  {{ formatDate(r.date) }}
                </p>


                <p class="mt-1 text-sm">
                  <span class="font-medium">Type :</span> {{ r.typeTitle }}
                </p>

                <p class="text-sm">
                  <span class="font-medium">Stand :</span> {{ r.standTitle }}
                </p>
              </div>
          </div>

          </div>

          <p v-else class="text-gray-400 mt-2">Aucune réservation.</p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
            🛍️ Commandes Goodies
          </h2>

          <div v-if="paidBaskets.length" class="mt-4 space-y-4">
            <div
                v-for="basket in paidBaskets"
                :key="basket.id"
                class="p-5 border rounded-xl bg-gray-50 shadow-sm"
            >
              <p class="font-semibold text-gray-900">
                Panier du {{ basket.date }}
              </p>

              <ul class="mt-2 space-y-1 text-sm">
                <li
                    v-for="item in paidBasketItemsForBasket(basket.id)"
                    :key="item.idgoodie + '-' + item.idcolor + '-' + item.idsize"
                    class="flex justify-between"
                >
                  <span>
                    {{ item.name }} —
                    <span class="text-gray-500">
                      {{ item.color }} / {{ item.size }}
                    </span>
                    × {{ item.count }}
                  </span>

                  <span class="font-semibold">
                    {{ (item.count * item.price).toFixed(2) }} €
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <p v-else class="text-gray-400 mt-2">Aucun panier payé.</p>
        </section>

      </div>
    </div>

  </div>

  <div v-else class="text-center text-gray-400 mt-10">
    Utilisateur non connecté.
  </div>
</template>


<script setup>
import { computed, onMounted } from 'vue';
import { useGoodiesStore, useTicketsStore, useUserStore, useReservationsStore, useStandsStore } from '@/stores/index.js';
import {getEventFromReservation} from "@/services/reservations.service.js";

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
  await goodiesStore.getGoodies()
  await goodiesStore.getSizes()
  await goodiesStore.getColors()
  await goodiesStore.getGoodiesSizes()
  await goodiesStore.getGoodiesColors()
  await goodiesStore.getAllBasketByUserId(user.value.id);

  // récupère les items pour chaque panier

  await goodiesStore.getAllBasketItems(user.value.id);


  await ticketStore.getBilletsByUserId(user.value.id);
  await reservationStore.getReservationByIdUser(user.value.id);
  await standStore.getStands();
  await userStore.getUsers();


  // pour affichage d'infos
  for (const r of reservations.value) {
    const film = await reservationStore.getEventFromReservation(r);
    r.filmTitle = film?.title || 'Titre inconnu';
    const autograph = await reservationStore.getEventFromReservation(r);
    const userOfAutograph = await userStore.getUserById(autograph.userId);
    r.starName = userOfAutograph?.name || 'Nom de la star inconnu';
    const stand = await standStore.getStandById(r.standId);
    r.standTitle = stand?.name || 'Titre inconnu';
    const typeStand = await standStore.getStandTypeById(r.type);
    r.typeTitle = typeStand?.type || 'Type inconnu';
  }
});

const formatDate = (date) => {
  if (!date) return 'Date inconnue';
  return new Date(date).toLocaleString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

</script>
