<template>
  <img
      src="@/assets/img/hero.webp"
      alt="Hero"
      class="w-full h-full object-cover absolute z-[-1]"
  />
  <div class="w-screen h-screen flex justify-center items-center">

    <form class="shadow-2xl p-3 rounded-lg bg-[var(--blanc)] flex flex-col gap-3 w-fit">
      <h1 class="text-[28px] text-center">Billetterie fgggvdbd</h1>

      <div class="flex flex-row gap-2">
        <div class="flex flex-col">
          <label for="firstname" class="font-roboto text-xs">Prénom</label>
          <input
              id="firstname"
              v-model="firstname"
              type="text"
              class="border border-[var(--noir)] outline-none rounded px-2"
          />
        </div>

        <div class="flex flex-col">
          <label for="lastname" class="font-roboto text-xs">Nom</label>
          <input
              id="lastname"
              v-model="lastname"
              type="text"
              class="border border-[var(--noir)] outline-none rounded px-2"
          />
        </div>
      </div>

      <div class="flex flex-col">
        <label for="email" class="font-roboto text-xs">Email</label>
        <input
            id="email"
            v-model="email"
            type="email"
            class="border border-[var(--noir)] outline-none rounded px-2"
        />
      </div>

      <div class="flex flex-col">
        <label for="creditnumber" class="font-roboto text-xs">Numéro de Carte</label>
        <input
            id="creditnumber"
            v-model="formattedCardNumber"
            placeholder="1234 5678 9012 3456"
            type="text"
            maxlength="19"
            class="border border-[var(--noir)] outline-none rounded px-2"
        />
      </div>

      <div class="flex flex-row gap-2">
        <div class="flex flex-col w-1/2">
          <label for="creditcode" class="font-roboto text-xs">CVV</label>
          <input
              id="creditcode"
              v-model="formattedCvv"
              placeholder="123"
              type="text"
              maxlength="3"
              class="border border-[var(--noir)] outline-none rounded px-2"
          />
        </div>

        <div class="flex flex-col w-1/2">
          <label for="enddate" class="font-roboto text-xs">Date de fin</label>
          <input
              id="enddate"
              v-model="formattedExpiry"
              placeholder="MM/AA"
              type="text"
              maxlength="5"
              class="border border-[var(--noir)] outline-none rounded px-2"
          />
        </div>
      </div>

      <div class="flex flex-col">
        <label for="tarif" class="font-roboto text-xs">Tarif</label>
        <select
            id="tarif"
            v-model="selectedTarif"
            class="border border-[var(--noir)] outline-none rounded px-2"
        >
          <option value="" disabled hidden>Choisissez une option</option>
          <option
              v-for="(item, index) in tarifs"
              :key="index"
              :value="item.id"
          >
            {{ item.name }} - {{ item.price }}€
          </option>
        </select>
      </div>

      <p
          v-if="message"
          class="text-center mt-2 text-sm"
          :class="{
            'text-green-600': message.includes('✅'),
            'text-red-600': message.includes('❌'),
            'text-yellow-600': message.includes('💳')
          }"
      >
        {{ message }}
      </p>

      <input
          type="submit"
          class="bg-[var(--grisf)] hover:bg-[var(--jaune)] hover:text-[var(--noir)] transition rounded w-fit self-center px-3 py-1 cursor-pointer"
          value="Acheter"
          @click="pay"
          :disabled="!isValid"
      />
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

const firstname = ref("")
const lastname = ref("")
const email = ref("")
const selectedTarif = ref("")
const message = ref("")
const cardNumber = ref("")
const expiry = ref("")
const cvv = ref("")

const tarifs = [
  { id: 1, name: "Enfant", price: 6 },
  { id: 2, name: "Étudiant", price: 8 },
  { id: 3, name: "Adulte", price: 11 },
]

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
      selectedTarif.value
  )
})

const pay = (e) => {
  e.preventDefault()

  if (!isValid.value) {
    message.value = "Veuillez remplir correctement tous les champs."
    return
  }

  message.value = "💳 Paiement en cours..."
}
</script>

<style scoped></style>
