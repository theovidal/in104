<template>
  <div :class="isMobile() ? 'mobile_center_wrap' : 'center_wrap'">
    <p class="error" v-if="error !== ''">{{ error }}</p>
    <qrcode-stream
      v-if="!scanned"
      :constraints="{ facingMode }"
      @detect="onDetect"
      @error="onError">
      <button @click="switchCamera">⮎</button>
    </qrcode-stream>
    <button
      v-if="scanned"
      @click="scanned = false; error = ''">Scanner de nouveau</button>
  </div>
</template>

<script setup>
import { endpoints, request } from '@/utils/api.js'
import { QrcodeStream } from 'vue-qrcode-reader'
import { ref } from 'vue'
import { isMobile } from "@/utils/device";

// CONSTANTS

// REFS
const error = ref('')
const scanned = ref(false)

const facingMode = ref('environment')

// COMPOSABLES

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

async function onDetect(data) {
  scanned.value = true;
  const response = await request(endpoints.presences, 'PATCH', {
    code: data[0].rawValue
  });
  if (response.ok) {
    alert('Vous avez bien été noté présent au cours !')
  } else {
    const data = await response.json();
    error.value = data.error;
  }
}
</script>
