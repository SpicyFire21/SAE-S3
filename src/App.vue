<template>
  <NavBar v-if="show"/>
  <RouterView/>

</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";

const show = computed(() => {
  const p = route.path
  return !(
      p.startsWith('/admin-dashboard') ||
      p.startsWith('/provider-dashboard') ||
      p.startsWith('/providerstand')
  )
})



const route = useRoute();

</script>

<style scoped></style>
