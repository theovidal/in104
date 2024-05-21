<template>
  <div class="center_wrap">
    <div :class="{ fullscreen: generation }">
      <button @click="onSwitchGeneration">{{ generation ? 'Arrêter' : "Faire l'appel" }}</button>
      <canvas
        v-show="generation && code !== ''"
        id="qrcode"></canvas>
      <input v-model="zoom" v-if="generation" type="range" min="0" max="1" step="0.01"/>

      <!-- Text to display when the code is currently being generated -->
      <p v-if="generation && code === ''">Rechargement...</p>
    </div>

    <h1>État de l'appel</h1>
    <button @click="getPresences">Rafraichir</button>
    <table>
      <thead>
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">Prénom</th>
        <th scope="col">Présent ?</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="(presence, index) in presences"
        :key="`${presence.userId} ${presence.lectureId}`"
        :class="{ 'present': presence.isPresent, 'absent': !presence.isPresent }">
        <th>{{ presence.lastname }}</th>
        <th>{{ presence.firstname }}</th>
        <th>{{ presence.isPresent ? 'Oui' : 'Non'}}</th>
        <th><button @click="switchPresence(index)">{{ presence.isPresent ? 'Marquer absent' : 'Marquer présent' }}</button></th>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import QRCode from 'qrcode'
import { ref } from 'vue'
import { endpoints, request } from '@/utils/api.js'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'

// COMPOSABLES
const route = useRoute()
const router = useRouter()

// CONSTANTS

const lectureId = route.params.id;

// Duration of one code (in seconds)
const displaySeconds = 3;

// REFS
const generation = ref(false);
const code = ref('');
const interval = ref(0);
const presences = ref([]);
const zoom = ref(0.7);

// We want to get the presences when the page loads
getPresences();

// FUNCTIONS
function onSwitchGeneration() {
  generation.value = !generation.value;

  if (generation.value) {
    refreshCode()
    interval.value = setInterval(refreshCode, displaySeconds * 1000);
  } else {
    clearInterval(interval.value)
    getPresences();
  }
}

onBeforeRouteLeave(() => clearInterval(interval.value))

async function refreshCode() {
  const response = await request(endpoints.codes, 'POST', {
    lectureId
  });
  if (!response.ok) {
    alert("L'identifiant du cours est incorrect");
    await router.push('/');
  }

  const data = await response.json();

  const canvas = document.getElementById("qrcode");
  QRCode.toCanvas(canvas, data.code, {
    width: window.innerWidth * zoom.value,
  });
  code.value = data.code;
}

async function getPresences() {
  const response = await request(`${endpoints.presences}?lectureId=${lectureId}`);
  presences.value = (await response.json()).data;
}

async function switchPresence(index) {
  const presence = presences.value[index];
  const response = await request(endpoints.presences, 'PATCH', {
    lectureId,
    userId: presence.userId,
    isPresent: !presence.isPresent
  })
  if (!response.ok) {
    const body = await response.json()
    alert(body.error);
    return
  }
  presences.value[index].isPresent = !presence.isPresent;
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.fullscreen {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
}
</style>
