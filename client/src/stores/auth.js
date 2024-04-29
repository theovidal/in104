import { defineStore } from 'pinia'
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(false)
  const data = ref({})

  async function login(email, password) {
    const form = {
      email,
      password,
    };


    // TODO : éventuellement try/catch pour gestion d'erreur du fetch en lui-même
    const response = await fetch(endpoints.login, {
      method: "POST",
      body:   JSON.stringify({
        email: form.email.value,
        password: form.password.value,
      })
    });

    // Vérification
    if (response.ok){
      data.value = await response.json();
      authenticated.value = true
      return true
    }
    else{
      alert("Mauvais identifiant ou mot de passe");
      //TODO : éventuellement un affichage dynamique sur la page ?
      return false
    }
  }

  return { authenticated, data, login }
})