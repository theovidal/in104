<template>
  <header>
    <div class="wrapper">
      <nav v-if="authStore.authenticated">
        <img alt="ENSTA logo" class="logo" src="/logo_ensta_paris_transparent.png" width="20" />
        <RouterLink class="nav-item" to="/">Accueil</RouterLink>
        <RouterLink
          class="nav-item"
          v-if="authStore.data.role === 'eleve'"
          to="/scan">Scanner un code</RouterLink>
        {{ authStore.data.firstname }} {{ authStore.data.lastname }}
        <RouterLink
          class="nav-item"
          @click="authStore.logout(); router.push({ name: 'login' })"
          to="/login">Déconnexion</RouterLink>
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
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore()
const router = useRouter()
</script>
