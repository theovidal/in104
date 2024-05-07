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

// CONSTANTS
const displaySeconds = 1;

// REFS
const generation = ref(false);
const course = ref('');
const code = ref('');
const interval = ref(0);

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
  const response = await request(endpoints.createCode, 'POST');
  const data = await response.json();

  const canvas = document.getElementById("qrcode");
  QRCode.toCanvas(canvas, `${window.location.origin}/scan?code=${data.code}`);
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
