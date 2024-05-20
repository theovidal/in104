<template>
  <div class="absences_wrap wrap_login">
    <h1>Mes absences</h1>
    <div
      v-for="presence in presences"
      :key="presence.id"
      class="absence_block">
      {{ presence.lectureId }}
    </div>
  </div>
</template>

<script setup>
import { endpoints, request } from '@/utils/api.js'
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()

const response = await request(`${endpoints.presences}?userId=${authStore.data.id}&present=false`)
const presences = await response.json()

let courses = {}

// For each presence, we want :
// - The lecture associated with this presence
//
/*for (let presence of presences) {
  const response = await request(`${endpoints.lectures}?id=${presence.lectureId}`);
  const lecture = await response.json();
  presence.lecture = lecture;

  if (courses[lecture.courseId] !== undefined) {
    const course = await request(`${endpoints.courses}?id=${lecture.courseId}`);
    courses[lecture.courseId] = await course.json();
  }
}*/
</script>