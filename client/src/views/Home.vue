<template>
  <div class="home_wrap">
    <Suspense v-if="authStore.data.role === 'professeur'">
      <Courses></Courses>
    </Suspense>
    <Suspense v-if="authStore.data.role === 'eleve'">
      <Absences></Absences>
    </Suspense>
    <Suspense v-if="authStore.data.role === 'administration'">
      <PresenceReport></PresenceReport>
    </Suspense>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js'
import Courses from '@/components/Courses.vue'
import Absences from '@/components/Absences.vue'
import PresenceReport from '@/components/PresenceReport.vue'

const authStore = useAuthStore()
</script>
