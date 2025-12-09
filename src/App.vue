<template>
  <NavBar v-if="show"/>
  <RouterView/>

</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";

const show = computed(()=>{
  return route.path !== '/admin-dashboard' && route.path !=='/provider-dashboard'
})


const route = useRoute();

</script>

<style scoped></style>
