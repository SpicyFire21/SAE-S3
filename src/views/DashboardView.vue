<template>
  <div class="h-screen w-screen flex overflow-hidden">
    <!-- Sidebar -->
    <AsidebarDashboard class="flex-shrink-0"/>

    <!-- Main content -->
    <div class="flex-1 overflow-auto">
      <RouterView name="dashboard"/>
    </div>
  </div>
</template>

<script setup>
import AsidebarDashboard from "@/components/Dashboard/AsidebarDashboard.vue";
</script>

<style scoped>
/* Pour un scroll fluide dans le contenu principal */
</style>
