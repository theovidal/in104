<template>
  <div class="lectures_wrap">
    <h1>Mes cours</h1>
    <RouterLink
      v-for="lecture in lectures"
      :key="lecture.id"
      class="lecture_block"
      :to="`/generate/${lecture.id}`"/>
    <div class="lecture_block_content">
      <h2>{{ course.name }} - {{ lecture.date }}</h2>
      <p>Durée : {{ lecture.duration }}</p>
    </div>
  </div>
</template>

<script setup>
import { endpoints, request } from '@/utils/api.js'
import { getLectureCourses } from '@/utils/lectures.js'

const response = await request(endpoints.lectures)
const lectures = await response.json()

const courses = getLectureCourses(lectures);
</script>