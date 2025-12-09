<template>
  <div class="h-screen w-screen flex">
    <AsidebarDashboard/>
    <RouterView name="dashboard"/>

  </div>
</template>


<script setup>

import AsidebarDashboard from "@/components/Dashboard/AsidebarDashboard.vue";
</script>

<style scoped>

</style>