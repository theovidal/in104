<template>
  <header>
    <div class="wrapper">
      <nav v-if="authStore.authenticated">
        <img alt="ENSTA logo" class="logo" src="/logo_ensta_paris.jpg" width="125" height="125" />
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink
            v-if="authStore.data.role === 'professeur'"
            to="/generate">Générer un code</RouterLink>
        <RouterLink
          v-if="authStore.data.role === 'eleve'"
          to="/scan">Scanner un code</RouterLink>
        {{ authStore.data.firstname }} {{ authStore.data.lastname }}
        <RouterLink
          @click="authStore.logout()"
          to="/login">Se déconnecter</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <p>This webpage was created for a class project. It is not suitable for online release</p>
    <p>DO WHATEVER YOU WANT TO PUBLIC LICENSE Version 2, December 2004</p>
  </footer>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore()
</script>
