<template>
  <div class="about">
    <button @click="onSwitchGeneration">{{ generation ? 'Arrêter' : "Faire l'appel" }}</button>

    <!-- Text to display when the code is currently being generated -->
    <p v-if="generation && code === ''">Rechargement...</p>

    <canvas
      v-show="generation && code !== ''"
      id="qrcode"></canvas>
  </div>
</template>

<script setup>
import QRCode from 'qrcode'
import { ref } from 'vue'
import { endpoints, request } from '@/utils/api.js'
import { useRoute, useRouter } from 'vue-router'

// CONSTANTS

// Duration of one code (in seconds)
const displaySeconds = 5;

// REFS
const generation = ref(false);
const code = ref('');
const interval = ref(0);

// COMPOSABLES
const route = useRoute()
const router = useRouter()

// FUNCTIONS
function onSwitchGeneration() {
  generation.value = !generation.value;

  if (generation.value) {
    refreshCode()
    interval.value = setInterval(refreshCode, displaySeconds * 1000);
  } else {
    clearInterval(interval.value)
  }
}

async function refreshCode() {
  const response = await request(endpoints.codes, 'POST', {
    lectureId: route.params.id
  });
  if (!response.ok) {
    alert("L'identifiant du cours est incorrect");
    await router.push('/');
  }

  const data = await response.json();

  const canvas = document.getElementById("qrcode");
  QRCode.toCanvas(canvas, data.code);
  code.value = data.code;
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
</style>
