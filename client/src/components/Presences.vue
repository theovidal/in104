<template>
  <div class="presences_wrap">
    <h1>Mes absences</h1>
    <div
      v-for="presence in presences"
      :key="presence.id"
      v-if="!presence.isPresent"
      class="presence_block">
      {{ presence.date }} - {{ courses[presence.lecture.courseId].name }}
      {{  }}
    </div>
  </div>
</template>

<script setup>
import { endpoints, request } from '@/utils/api.js'

const response = await request(endpoints.presences)
let presences = await response.json()

let courses = {}

// For each presence, we want :
// - The lecture associated with this presence
//
for (let presence of presences) {
  const response = await request(`${endpoints.lectures}/${presence.lectureId}`);
  const lecture = await response.json();
  presence.lecture = lecture;

  if (courses[lecture.courseId] !== undefined) {
    const course = await request(`${endpoints.course}/${lecture.courseId}`);
    courses[lecture.courseId] = await course.json();
  }
}
</script>