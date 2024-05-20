<template>
  <div class="wrap_login">
    <p class="error" v-if="error !== ''">{{ error }}</p>
    <qrcode-stream
      v-if="result === ''"
      :constraints="{ facingMode }"
      @detect="onDetect"
      @error="onError">
      <button @click="switchCamera">⮎</button>
    </qrcode-stream>
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

const facingMode = ref('environment')

// COMPOSABLES
const route = useRoute()
if (route.query.code !== undefined) {
  result.value = route.query.code;
  validateCode();
}

// FUNCTIONS

function switchCamera() {
  switch (facingMode.value) {
    case 'environment':
      facingMode.value = 'user'
      break
    case 'user':
      facingMode.value = 'environment'
      break
  }
}

function onError(err) {
  error.value = `[${err.name}]: `

  if (err.name === 'NotAllowedError') {
    error.value += "Vous devez autoriser l'accès à la caméra."
  } else if (err.name === 'NotFoundError') {
    error.value += 'Cet appareil ne comporte pas de caméra'
  } else if (err.name === 'NotSupportedError') {
    error.value += "Le site n'est pas sécurisé en HTTPS."
  } else if (err.name === 'NotReadableError') {
    error.value += 'La caméra est déjà utilisée par une autre application.'
  } else if (err.name === 'OverconstrainedError') {
    error.value += 'Les caméras de votre appareil ne sont pas compatibles.'
  } else if (err.name === 'StreamApiNotSupportedError') {
    error.value += "Fonctionnalité de scan non supportée dans ce navigateur."
  } else if (err.name === 'InsecureContextError') {
    error.value += "Le site n'est pas sécurisé en HTTPS."
  } else {
    error.value += err.message
  }
}

function onDetect(data) {
  validateCode(data[0].rawValue)
}

async function validateCode(code) {
  const response = await request(endpoints.presences, 'PATCH', {
    code
  });
  if (response.ok) {
    alert('Vous avez bien été noté présent au cours !')
  } else {
    const data = await response.json();
    error.value = data.error;
  }
}
</script>
