<template>
  <div class="wrap_login">
    <div class="header_login">
      <img src="/public/logo_ensta_paris.jpg" alt="Logo ENSTA Paris" height="200vh" width="auto" />
      <h1>Entrez vos identifiants</h1>
    </div>
    <!-- formulaire de connexion -->
    <!-- TODO : Validation UI-->
    <div>
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

// --------- STORES ------------
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// --------- REFS ----------
const email = ref('')
const password = ref('')

// --------- METHODS -----------
function onLogin() {
  if (authStore.login(email.value, password.value)) {
    router.push('/')
  }
}
</script>

<style scoped>
html {
  font-size: 10px;
  font-family: 'Open Sans', sans-serif;
}

h1{
  font-size: 30px;
  text-align: center;
  color: #777777;
}

body{
  background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("/public/backgrounds/amphi2026.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100vw auto;
}

main{
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  min-height: 100vh;
}

.wrap_login{
  width: 60vh;
  min-width: auto;
  max-width: 500px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  padding: 5vh 10px;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  position: relative;
  bottom: 10vh;
}

.header_login{
  width: 100%;
}

.form_login{
  /* TODO : style form */
  width: 100%;
  border-radius: 3px;
  margin: 15px;
}

input[type=text]{
  background: #e6e6e6;
  border: #aaaaaa;
  min-width: fit-content;
  width: 50%;
  padding:10px;
  border-radius: 5px;
}

input[type=password]{
  background: #e6e6e6;
  border: #aaaaaa;
  min-width: fit-content;
  width: 50%;
  padding:10px;
  border-radius: 5px;
}

input[type=submit]{
  cursor:pointer;
  border-radius: 5px;
  background-color: #142654;
  color:#fff;
  font-size: 25px;
  padding: 10px;
  margin-top: 20px;
  min-width: fit-content;
  width: 50%;
  border:0px;
}

footer{
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: small;
  color: #fff;
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>