<template>
  <div class="w-screen min-h-screen bg-cover bg-center flex justify-center pt-24 pb-24" :style="{ backgroundImage: `url(${bgImage})` }">
    <form
        class="w-full max-w-lg bg-[var(--blanc)] text-[var(--noir)] rounded-3xl shadow-2xl flex flex-col gap-6 p-8 border border-[var(--gris)]"
    >
      <h1 class="text-3xl font-bold text-center tracking-wide mb-4">
        {{ t('Tickets.tickets') }}
      </h1>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col">
          <label for="firstname" class="text-xs text-[var(--noir)] mb-1">{{ t('Tickets.firstname') }}</label>
          <input
              id="firstname"
              v-model="firstname"
              type="text"
              class="p-2 rounded-lg bg-[var(--gris)] text-[var(--noir)] outline-none focus:ring-2 ring-[var(--jaune)]"
          />
        </div>

        <div class="flex flex-col">
          <label for="lastname" class="text-xs text-[var(--noir)] mb-1">{{ t('Tickets.lastname') }}</label>
          <input
              id="lastname"
              v-model="lastname"
              type="text"
              class="p-2 rounded-lg bg-[var(--gris)] text-[var(--noir)] outline-none focus:ring-2 ring-[var(--jaune)]"
          />
        </div>
      </div>

      <div class="flex flex-col">
        <label for="email" class="text-xs text-[var(--noir)] mb-1">Email</label>
        <input
            id="email"
            v-model="email"
            type="email"
            class="p-2 rounded-lg bg-[var(--gris)] text-[var(--noir)] outline-none focus:ring-2 ring-[var(--jaune)]"
        />
      </div>
      <div class="flex flex-row justify-around gap-5">
      <div class="flex flex-col w-full">
        <label class="text-xs text-[var(--noir)] mb-1">{{ t('Tickets.from') }}</label>
        <input
            type="date"
            v-model="datefrom"
            class="p-2 rounded-lg bg-[var(--gris)] text-[var(--noir)] outline-none focus:ring-2 ring-[var(--jaune)]"
        />
      </div>

      <div class="flex flex-col w-full">
        <label class="text-xs text-[var(--noir)] mb-1">{{ t('Tickets.to') }}</label>
        <input
            type="date"
            v-model="dateto"
            class="p-2 rounded-lg bg-[var(--gris)] text-[var(--noir)] outline-none focus:ring-2 ring-[var(--jaune)]"
        />
      </div>
      </div>

      <div class="flex flex-col">
        <label for="tarif" class="text-xs text-[var(--noir)] mb-1">{{ t('Tickets.priceList') }}</label>
        <select
            id="tarif"
            v-model="selectedTarif"
            class="p-2 rounded-lg bg-[var(--gris)] text-[var(--noir)] outline-none focus:ring-2 ring-[var(--jaune)]"
        >
          <option value="" disabled hidden>{{ t('Tickets.choose') }}</option>
          <option
              v-for="(item, index) in tarifs"
              :key="index"
              :value="item.id"
          >
            {{ item.name }} - {{ item.price }}€
          </option>
        </select>
      </div>

      <div class="flex flex-col">
        <label for="creditnumber" class="text-xs text-[var(--noir)] mb-1">{{ t('Tickets.CreditCardNumber') }}</label>
        <input
            id="creditnumber"
            v-model="formattedCardNumber"
            placeholder="1234 5678 9012 3456"
            type="text"
            maxlength="19"
            class="p-2 rounded-lg bg-[var(--gris)] text-[var(--noir)] outline-none focus:ring-2 ring-[var(--jaune)]"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col">
          <label for="creditcode" class="text-xs text-[var(--noir)] mb-1">CVV</label>
          <input
              id="creditcode"
              v-model="formattedCvv"
              placeholder="123"
              type="text"
              maxlength="3"
              class="p-2 rounded-lg bg-[var(--gris)] text-[var(--noir)] outline-none focus:ring-2 ring-[var(--jaune)]"
          />
        </div>

        <div class="flex flex-col">
          <label for="enddate" class="text-xs text-[var(--noir)] mb-1">{{ t('Tickets.enddate') }}</label>
          <input
              id="enddate"
              v-model="formattedExpiry"
              placeholder="MM/AA"
              type="text"
              maxlength="5"
              class="p-2 rounded-lg bg-[var(--gris)] text-[var(--noir)] outline-none focus:ring-2 ring-[var(--jaune)]"
          />
        </div>
      </div>

      <p
          v-if="message"
          class="text-center text-sm"
          :class="{
          'text-green': message.includes('✅'),
          'text-red': message.includes('❌'),
          'text-[var(--jaune)]': message.includes('💳')
        }"
      >
        {{ message }}
      </p>

      <button
          type="submit"
          class="bg-[var(--jaune)] hover:bg-[var(--jaune)] text-[var(--blanc)] tracking-widest font-semibold rounded-xl py-2 transition-all"
          @click="pay"
      >
        {{ t('Tickets.submit') }}
      </button>
    </form>
  </div>
</template>




<script setup>
import bgImage from '../assets/img/bgbilleterie.png'
import {ref, computed} from "vue"
import {useRouter} from "vue-router";
import {useI18n} from 'vue-i18n'
import {useUserStore} from "@/stores/index.js";
import {useTicketsStore} from "@/stores/modules/tickets.js";

const {t, tm} = useI18n()
const route = useRouter()
const userStore = useUserStore();
const ticketStore = useTicketsStore();

const firstname = ref("")
const lastname = ref("")
const email = ref("")
const selectedTarif = ref("")
const message = ref("")
const cardNumber = ref("")
const expiry = ref("")
const cvv = ref("")
const datefrom = ref("");
const dateto = ref("");



const tarifs = computed(() => tm('Tickets.list'))

const formattedCardNumber = computed({
  get: () =>
      cardNumber.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim(),
  set: (val) => (cardNumber.value = val.replace(/\D/g, "").slice(0, 16)),
})

const formattedExpiry = computed({
  get: () =>
      expiry.value.replace(/\D/g, "").replace(/(\d{2})(\d{1,2})/, "$1/$2").slice(0, 5),
  set: (val) => (expiry.value = val.replace(/\D/g, "").slice(0, 4)),
})

const formattedCvv = computed({
  get: () => cvv.value,
  set: (val) => (cvv.value = val.replace(/\D/g, "").slice(0, 3)),
})

const isValid = computed(() => {
  return (
      firstname.value.trim() &&
      lastname.value.trim() &&
      email.value.includes("@") &&
      cardNumber.value.length === 16 &&
      expiry.value.length === 4 &&
      cvv.value.length === 3 &&
      selectedTarif.value &&
      datefrom.value &&
      dateto.value
  )
})

const pay = async (e) => {
  e.preventDefault()
  if(!userStore.currentUser){
    await route.push({path: `/login`})
  }
  if (!isValid.value) {
    message.value = "❌ Veuillez remplir correctement tous les champs."
    return
  }

  const data = {

    iduser:userStore.currentUser.id,
    from:datefrom.value,
    to:dateto.value,
    priceid:selectedTarif
  };


  message.value = "Paiement en cours..."
  console.log(data)
  const buyTicket = await ticketStore.createTicket(data);

  if (buyTicket.error){
    alert("Erreur lors du payement");
    return;
  } else {
    await route.push({path: `/ticket/${buyTicket.idticket}`})

  }


}
</script>

<style scoped></style>
