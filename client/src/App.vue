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
        <div class="user_show">
          <img class=icon src="/user_icon.png" alt="user icon" height="13px">
        {{ authStore.data.firstname }} {{ authStore.data.lastname }}
        <RouterLink
          class="nav-item"
          @click="authStore.logout(); router.push({ name: 'login' })"
          to="/login">Déconnexion</RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>

  <footer v-if="!isMobile()">
    <p>Cette page a été crée pour un projet scolaire. Il n'est pas fait pour être disponible publiquement.</p>
    <p>Arnaud PELISSIER - Doris DIALLO - Seydou SENE - Théo VIDAL</p>
  </footer>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth.js";
import { isMobile } from "@/utils/device";

const authStore = useAuthStore()
const router = useRouter()
</script>
