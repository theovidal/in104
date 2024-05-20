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
        v-for="presence in presences.data"
        :key="`${presence.userId} ${presence.lectureId}`"
        :class="{'present': presence.isPresent, 'absent': !presence.isPresent}">
        <th>{{ presence.lastname }}</th>
        <th>{{ presence.firstname }}</th>
        <th>{{ presence.name }}</th>
        <th>{{ dayjs(presence.beginDate).locale('fr').format('LLL') }}</th>
        <th>{{ presence.isPresent ? 'Oui' : 'Non'}}</th>
      </tr>
      </tbody>
    </table>
    <button @click="exportPresences">Exporter le rapport</button>
  </div>
</template>

<script setup>
import { endpoints, request } from '@/utils/api.js';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs'

const response = await request(endpoints.presences);
const presences = await response.json();

function exportPresences() {
  let data = "Nom,Prénom,Cours,Date,Présent ?\n";
  for (const presence of presences.data) {
    data += `${presence.firstname},${presence.lastname},${presence.name},${presence.beginDate},${presence.isPresent ? 'Oui' : 'Non'}\n`;
  }

  const blob = new Blob([data], {
    type: 'text/csv'
  });
  saveAs(blob, "presences.csv");
}
</script>