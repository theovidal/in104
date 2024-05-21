<template>
  <div class="center_wrap">
    <template v-if="courses.data.length > 0">
      <h1>Mes cours</h1>
      <p>Cliquez sur une séance pour faire l'appel !</p>
    </template>
    <h1 v-else>Aucun cours pour le moment...</h1>
    <div
      v-for="course in courses.data"
      :key="course.id"
      class="course_block">
      <table>
        <thead>
          <tr>
            <th scope="col">Nom du cours</th>
            <th scope="col">Séances</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="course.lectures.length > 0">
            <td :rowspan="course.lectures.length">{{ course.name }}</td>
            <td>
              <RouterLink
                v-for="lecture in course.lectures"
                :key="lecture.id"
                class="lecture_block nav-item"
                :class="{ disabled: isOver(lecture) }"
                :to="isOver(lecture) ? '/' : `/generate/${lecture.id}`">
                <div class="lecture_block_content">
                  <h2>{{ dayjs(lecture.beginDate).locale('fr').format('LLL') }}</h2>
                </div>
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { endpoints, request } from '@/utils/api.js'
import dayjs from 'dayjs'

const response = await request(endpoints.courses)
const courses = await response.json()

function isOver(lecture) {
  const now = new Date();
  return new Date(lecture.beginDate) > now || new Date(lecture.endDate) < now
}
</script>

<style>

</style>
