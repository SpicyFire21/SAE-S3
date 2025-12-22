<template>
  <footer class="bg-[var(--blanc)] text-[var(--noir)] border-t border-[var(--gris)] py-12 mt-15">
    <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row justify-between gap-10">

      <!-- Branding -->
      <div class="flex flex-col gap-4">
        <h2 class="text-2xl font-bold text-[var(--jaune)]">Le Grand Focus</h2>
        <p class="text-[var(--noir)] max-w-sm">
          Produits exclusifs inspirés du cinéma et services premium pour les fans.
        </p>
      </div>

      <!-- Navigation -->
      <div class="flex flex-col gap-3">
        <h3 class="font-semibold text-[var(--noir)]">Navigation</h3>
        <ul class="flex flex-col gap-2">
          <li><router-link to="/" class="hover:text-[var(--jaune)] transition">Accueil</router-link></li>
          <li><router-link to="/ticket" class="hover:text-[var(--jaune)] transition">Billeterie</router-link></li>
          <li><router-link to="/films" class="hover:text-[var(--jaune)] transition">Films</router-link></li>
          <li><router-link to="/goodies" class="hover:text-[var(--jaune)] transition">Goodies</router-link></li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="flex flex-col gap-3">
        <h3 class="font-semibold text-[var(--noir)]">Contact</h3>
        <p>Email: <a href="mailto:contact@grandfocus.com" class="hover:text-[var(--jaune)]">contact@grandfocus.com</a></p>
        <p>Téléphone: <a href="tel:+330123456789" class="hover:text-[var(--jaune)]">01 23 45 67 89</a></p>
      </div>

      <!-- Réseaux sociaux -->
      <div class="flex flex-col gap-3">
        <h3 class="font-semibold text-[var(--noir)]">Suivez-nous</h3>
        <div class="flex gap-4 mt-2">
          <a href="#" class="hover:text-[var(--jaune)] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.27 4.27 0 001.88-2.36 8.48 8.48 0 01-2.7 1.03 4.24 4.24 0 00-7.23 3.87A12.02 12.02 0 013 4.89a4.24 4.24 0 001.31 5.66 4.2 4.2 0 01-1.92-.53v.05a4.24 4.24 0 003.4 4.16 4.28 4.28 0 01-1.91.07 4.24 4.24 0 003.96 2.95A8.5 8.5 0 012 19.54 12 12 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.36 8.36 0 0022.46 6z"/></svg>
          </a>
          <a href="#" class="hover:text-[var(--jaune)] transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.42 2.87 8.17 6.84 9.5v-6.72h-2.06v-2.78h2.06v-2.12c0-2.04 1.21-3.16 3.05-3.16.88 0 1.8.16 1.8.16v1.99h-1.02c-1 0-1.31.62-1.31 1.25v1.88h2.23l-.36 2.78h-1.87V22c3.97-1.33 6.84-5.08 6.84-9.5 0-5.5-4.46-9.96-9.96-9.96z"/></svg>
          </a>
        </div>
      </div>

    </div>

    <div class="mt-10 border-t border-[var(--gris)] pt-6 text-center text-black/80 text-sm">
      © 2025 Le Grand Focus. Tous droits réservés.
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
</style>
