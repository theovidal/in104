<template>
  <div class="center_wrap">
    <h1>Mes absences</h1>
    <div
      v-for="presence in presences"
      :key="presence.id"
      class="absence_block">
      <table>
        <thead>
        <tr>
          <th scope="col">Cours</th>
          <th scope="col">Date</th>
          <th scope="col">Présent ?</th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="presence in presences.data"
          :key="`${presence.lectureId}`"
          :class="{ 'present': presence.isPresent, 'absent': !presence.isPresent }">
          <th>{{ presence.name }}</th>
          <th>{{ dayjs(presence.beginDate).format('LLL') }}</th>
          <th>{{ presence.isPresent ? 'Oui' : 'Non'}}</th>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { endpoints, request } from '@/utils/api.js'
import { useAuthStore } from '@/stores/auth.js'
import dayjs from 'dayjs'

const authStore = useAuthStore()

const response = await request(`${endpoints.presences}?userId=${authStore.data.id}`)
const presences = await response.json()
</script>