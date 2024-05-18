<template>
  <div class="presence_report_wrap">
    <table>
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Prénom</th>
          <th scope="col">Cours</th>
          <th scope="col">Date</th>
          <th scope="col">Présent ?</th>
        </tr>
      </thead>
      <tbody>
      <tr
        v-for="presence in presences"
        :key="`${presence.userId} ${presence.lectureId}`"
        :class="{presence.isPresent ? "present" : "absent"}">
        <th>{{ presence.user.lastName }}</th>
        <th>{{ presence.user.firstName }}</th>
        <th>{{ presence.course.name }}</th>
        <th>{{ presence.lecture.date }}</th>
        <th>{{ presence.isPresent ? 'Oui' : 'Non'}}</th>
      </tr>
      </tbody>
    </table>
    <button @click="exportPresences">Exporter le rapport</button>
  </div>
</template>

<script>
import { endpoints, request } from '@/utils/api.js';
import { saveAs } from 'file-saver';

const response = await request(endpoints.presenceReport);
const presences = await response.json();

function exportPresences() {
  let data = "Nom,Prénom,Cours,Date,Présent ?\n";
  for (const presence of presences) {
    data += `${presence.user.firstName},${presence.user.lastName},${presence.course.name},${presence.lecture.date},${presence.isPresent ? 'Oui' : 'Non'}\n`;
  }

  const blob = new Blob([data], {
    type: 'text/csv'
  });
  saveAs(blob, "presences.csv");
}
</script>