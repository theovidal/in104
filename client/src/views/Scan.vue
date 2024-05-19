<template>
  <div>
    <p class="error" v-if="error !== ''">{{ error }}</p>
    <qrcode-stream
      v-if="result === ''"
      @detect="onDetect"
      @error="onError"></qrcode-stream>
    <button
      v-if="result !== ''"
      @click="result = ''; error = ''">Scanner de nouveau</button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { apiUrl, endpoints, request } from '@/utils/api.js'
import { QrcodeStream } from 'vue-qrcode-reader'
import { ref } from 'vue'

// CONSTANTS
const regexp = new RegExp(String.raw`.*\/scan\?code=(.*)`, 'g')

// REFS
const error = ref('')
const result = ref('')

// COMPOSABLES
const route = useRoute()
if (route.query.code !== undefined) {
  result.value = route.query.code;
  validateCode();
}

// FUNCTIONS

function onError(err) {
  error.value = `[${err.name}]: `

  if (err.name === 'NotAllowedError') {
    error.value += 'you need to grant camera access permission'
  } else if (err.name === 'NotFoundError') {
    error.value += 'no camera on this device'
  } else if (err.name === 'NotSupportedError') {
    error.value += 'secure context required (HTTPS, localhost)'
  } else if (err.name === 'NotReadableError') {
    error.value += 'is the camera already in use?'
  } else if (err.name === 'OverconstrainedError') {
    error.value += 'installed cameras are not suitable'
  } else if (err.name === 'StreamApiNotSupportedError') {
    error.value += 'Stream API is not supported in this browser'
  } else if (err.name === 'InsecureContextError') {
    error.value += 'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
  } else {
    error.value += err.message
  }
}

function onDetect(data) {
  console.log(data)
  const exp = regexp.exec(data[0].rawValue)
  console.log(exp)
  if (exp === null) {
    error.value = 'Le code fourni est invalide'
    result.value = error.value
  } else {
    result.value = exp[1]
    validateCode()
  }
}

async function validateCode() {
  const response = await request(`${endpoints.scanCode}?code=${result.value}`);
  if (response.ok) {
    alert('Vous avez bien été noté présent au cours !')
  } else {
    const data = await response.json();
    error.value = data.error;
  }
}
</script>
