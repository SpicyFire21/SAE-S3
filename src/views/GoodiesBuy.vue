<template>
  <div
      class="w-screen min-h-screen bg-cover bg-center flex justify-center pt-24 pb-24"
      :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <form
        class="w-full max-w-lg bg-[var(--blanc)] text-[var(--noir)] rounded-3xl shadow-2xl flex flex-col gap-6 p-8 border border-[var(--gris)]"
        @submit.prevent="pay"
    >
      <h1 class="text-3xl font-bold text-center tracking-wide mb-4">
        {{ t('GoodiesBuy.1') }}
      </h1>

      <!-- RÉCAP PANIER -->
      <div class="bg-[var(--gris)] rounded-xl p-4 text-sm">
        <h2 class="font-semibold mb-3">{{ t('GoodiesBuy.2') }}</h2>
        <div
            v-for="item in groupedBasketItems"
            :key="`${item.idgoodie}-${item.idcolor}-${item.idsize}`"
            class="flex justify-between mb-1"
        >
          <span>
            {{ goodiesStore.getName(item.idgoodie) }}
            ({{ goodiesStore.getColor(item.idcolor) }} /
            {{ goodiesStore.getSize(item.idsize) }})
            × {{ item.count }}
          </span>
          <span>
            {{ (item.count * goodiesStore.getPrice(item.idgoodie)).toFixed(2) }} €
          </span>
        </div>

        <div class="flex justify-between font-bold mt-3">
          <span>Total</span>
          <span>{{ total.toFixed(2) }} €</span>
        </div>
      </div>

      <!-- INFOS UTILISATEUR -->
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col">
          <label class="text-xs mb-1">{{ t('GoodiesBuy.3') }}</label>
          <input
              v-model="firstname"

              class="p-2 rounded-lg bg-[var(--gris)]"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs mb-1">{{ t('GoodiesBuy.4') }}</label>
          <input
              v-model="lastname"

              class="p-2 rounded-lg bg-[var(--gris)]"
          />
        </div>
      </div>

      <div class="flex flex-col">
        <label class="text-xs mb-1">Email</label>
        <input
            v-model="email"

            class="p-2 rounded-lg bg-[var(--gris)]"
        />
      </div>

      <!-- PAIEMENT -->
      <div class="flex flex-col">
        <label class="text-xs mb-1">{{ t('GoodiesBuy.5') }}</label>
        <input
            v-model="formattedCardNumber"
            placeholder="1234 5678 9012 3456"
            maxlength="19"
            class="p-2 rounded-lg bg-[var(--gris)]"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col">
          <label class="text-xs mb-1">CVV</label>
          <input
              v-model="cvv"
              placeholder="123"
              maxlength="3"
              class="p-2 rounded-lg bg-[var(--gris)]"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs mb-1">Expiration</label>
          <input
              v-model="formattedExpiry"
              placeholder="MM/AA"
              maxlength="5"
              class="p-2 rounded-lg bg-[var(--gris)]"
          />
        </div>
      </div>

      <p v-if="message" class="text-center text-sm">
        {{ message }}
      </p>

      <button
          type="submit"
          class="bg-[var(--jaune)] text-[var(--blanc)] rounded-xl py-3 font-semibold tracking-widest"
          :disabled="goodiesStore.basketItems.length === 0"
      >
        {{ t('GoodiesBuy.6') }} {{ total.toFixed(2) }} €
      </button>
    </form>
  </div>
</template>

<script setup>
import bgImage from "@/assets/img/bgbilleterie.png"
import { ref, computed, onMounted } from "vue"
import { useGoodiesStore, useUserStore } from "@/stores"
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
const {t, tm} = useI18n()

const goodiesStore = useGoodiesStore()
const userStore = useUserStore()
const route = useRouter()

const firstname = ref("")
const lastname = ref("")
const email = ref("")

const cardNumber = ref("")
const expiry = ref("")
const cvv = ref("")
const message = ref("")

onMounted(async () => {
  await goodiesStore.getGoodies()
  await goodiesStore.getSizes()
  await goodiesStore.getColors()
  await goodiesStore.getGoodiesSizes()
  await goodiesStore.getGoodiesColors()

  if (userStore.currentUser) {
    // await goodiesStore.getBasketByUserId(userStore.currentUser.id)
    // await goodiesStore.getBasketItems(goodiesStore.basket.id)
    firstname.value = userStore.currentUser.name
    lastname.value = userStore.currentUser.lastname
    email.value = userStore.currentUser.email
  }




})

const isValid = computed(() => {
  return (
      firstname.value.trim() &&
      lastname.value.trim() &&
      email.value.includes("@") &&
      cardNumber.value.length === 16 &&
      expiry.value.length === 4 &&
      cvv.value.length === 3

  )
})

const groupedBasketItems = computed(() => {
  const map = {}

  goodiesStore.basketItems.forEach(item => {
    const key = `${item.idgoodie}-${item.idcolor}-${item.idsize}`
    if (!map[key]) {
      map[key] = { ...item, count: Number(item.count) }
    } else {
      map[key].count = Number(item.count)
    }
  })
  return Object.values(map)
})

const total = computed(() =>
    groupedBasketItems.value.reduce(
        (sum, item) =>
            sum + goodiesStore.getPrice(item.idgoodie) * item.count,
        0
    )
)

const formattedExpiry = computed({
  get: () =>
      expiry.value.replace(/\D/g, "").replace(/(\d{2})(\d{1,2})/, "$1/$2").slice(0, 5),
  set: (val) => (expiry.value = val.replace(/\D/g, "").slice(0, 4)),
})
const formattedCardNumber = computed({
  get: () =>
      cardNumber.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim(),
  set: (val) => (cardNumber.value = val.replace(/\D/g, "").slice(0, 16)),
})

async function pay() {
  const orderId = goodiesStore.basket?.id
  if (!orderId) {
    await route.push({path: `/goodies`})

  }
  if (!isValid.value) {

    message.value = `❌ ${t('GoodiesBuy.7')}`
    return
  }

  message.value = `${t('GoodiesBuy.8')}`

  try {
    await goodiesStore.payOrder(orderId)
    message.value = `${t('GoodiesBuy.9')}`
  } catch {
    message.value = `${t('GoodiesBuy.10')}`
  }
}
</script>
