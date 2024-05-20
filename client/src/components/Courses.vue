<template>
  <div class="courses_wrap wrap_login">
    <h1>Mes cours</h1>
    <div
      v-for="course in courses"
      :key="course.id"
      class="course_block">
      <h2>{{ course.name }}</h2>
      <RouterLink
        v-for="lecture in course.lectures"
        :key="lecture.id"
        class="lecture_block"
        :to="`/generate/${lecture.id}`">
        <div class="lecture_block_content">
          <h2>{{ dayjs(lecture.beginDate).locale('fr').format('LLL') }}</h2>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { endpoints, request } from '@/utils/api.js'
import dayjs from 'dayjs'

const response = await request(endpoints.courses)
const data = await response.json()

const courses = data.data
console.log(courses)
</script>
