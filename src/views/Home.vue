<template>
  <Hero/>
  <div class="bg-[var(--blanc)] flex flex-col items-center px-10 py-5">

    <div class="flex flex-row bg-[var(--gris)] justify-center w-fit py-3 px-2 gap-5">
      <button class="bg-[var(--jaune)] px-2 py-1">Prenez vos billets dès maintenant</button>

      <select name="" id="" class="shadow-lg">
        <option>listes des Billets disponibles</option>
      </select>
    </div>

    <div id="carrousel">
      <Carrousel/>
    </div>

  </div>

</template>

<script setup>
import Hero from "@/components/Accueil/Hero.vue";
import Carrousel from "@/components/Accueil/Carrousel.vue";

</script>


