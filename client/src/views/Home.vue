
<template>
  <div class="home_wrap">
   <!-- <Presences v-if="authStore.data.role === 'eleve'"/>
    <Lectures v-else-if="authStore.data.role === 'professeur'"/>
    <PresenceReport v-else-if="authStore.data.role === 'administration'"/>-->
    <Suspense v-if="authStore.data.role === 'professeur'">
      <Courses></Courses>
    </Suspense>
    <Suspense v-if="authStore.data.role === 'eleve'">
      <Absences></Absences>
    </Suspense>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js'
import Courses from '@/components/Courses.vue'
import Absences from '@/components/Absences.vue'

const authStore = useAuthStore()
</script>
