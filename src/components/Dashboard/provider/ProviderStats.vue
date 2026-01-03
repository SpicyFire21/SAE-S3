<template>
  <div class="pl-68 w-full">
    <SimpleChart
        :labels="['Jan', 'Feb', 'Mar']"
        :values="[12, 19, 7]"
        label="Ventes"
    />
  </div>


</template>

<script setup>

import SimpleChart from "@/components/utils/SimpleChart.vue";
</script>
