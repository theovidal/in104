<template>
  <div :class="isMobile() ? 'mobile_center_wrap' : 'center_wrap'">
    <div class="header_login">
      <img src="/logo_ensta_paris.jpg" alt="Logo ENSTA Paris" height="200vh" width="auto" />
      <h1>Entrez vos identifiants</h1>
    </div>
    <!-- connexion form -->
    <div>-
      <div class="form_login">
        <input v-model="email" type="email" id="email" name="email" placeholder="Adresse email" required="required"/>
      </div>
      <div class="form_login">
        <input v-model="password" type="password" is="pwd" name="pwd" placeholder="Mot de passe" required="required"/>
      </div>
      <div class="form_login">
        <button @click="onLogin">Se connecter</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from "@/stores/auth.js";
import { isMobile } from "@/utils/device";

// --------- COMPOSABLES ------------
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

if (authStore.authenticated) router.push('/')

// --------- REFS ----------
const email = ref('')
const password = ref('')

// --------- METHODS -----------
async function onLogin() {
  if (await authStore.login(email.value, password.value)) {
    await router.push(route.query.redirect || '/')
  }
}
</script>

<style scoped>
.header_login{
  width: 100%;
}

.form_login{
  width: 100%;
  border-radius: 3px;
  margin: 15px;
}
</style>