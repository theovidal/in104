
<template>
  <div class="home_wrap">
    <Presences v-if="authStore.data.role === 'eleve'"/>
    <Lectures v-else-if="authStore.data.role === 'professeur'"/>
    <PresenceReport v-else-if="authStore.data.role === 'administration'"/>
  </div>
</template>

<script setup>

import { useAuthStore } from '@/stores/auth.js'
import Presences from '@/components/Presences.vue'
import Lectures from './components/Lectures.vue'
import PresenceReport from '@/components/PresenceReport.vue'

const authStore = useAuthStore()
</script>
