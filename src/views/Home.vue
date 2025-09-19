<template>
  <Hero/>
  <div class="bg-[var(--blanc)] flex flex-col items-center px-10 py-5">

    <div class="flex flex-row bg-[var(--gris)] justify-center w-fit py-3 px-2 gap-15 scale-125 m-5">
      <button class="bg-[var(--jaune)] px-2 py-1">Prenez vos billets dès maintenant</button>

      <div class="relative w-80">
        <select
            class="appearance-none shadow-lg w-full rounded px-5 py-1 text-[var(--grisf)] bg-[var(--blanc)]"
        >
          <option>Listes des Billets disponibles</option>
        </select>
        <svg
            class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-[var(--grisf)] pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>
    </div>

    <div class="mt-5">
      <div class="mt-5 text-center">
        <h1 class="text-[28px] inline-block bg-[var(--gris)] px-3 py-1">
          Decouvrez des icônes du cinema
        </h1>
      </div>
      <div id="carrousel">
        <Carrousel/>
      </div>
    </div>

  </div>
</template>

<script setup>
import Hero from "@/components/Accueil/Hero.vue";
import Carrousel from "@/components/Accueil/Carrousel.vue";

</script>
