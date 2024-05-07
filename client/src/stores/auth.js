import { defineStore } from 'pinia'
import { ref } from "vue";
import { endpoints } from '@/utils/api.js'
import { request } from '@/utils/api.js'

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(false)
  const data = ref({})

  async function getSession() {
    try {
      const response = await request(endpoints.profile)
      if (response.ok) {
        authenticated.value = true
        data.value = await response.json()
      }
      return response.ok
    } catch {
      return false
    }
  }

  async function login(email, password) {
    // TODO : éventuellement try/catch pour gestion d'erreur du fetch en lui-même
    const response = await request(endpoints.login, 'POST', {
      email,
      password
    });

    // Vérification
    if (response.ok){
      const json = await response.json();
      data.value = json.user;
      authenticated.value = true
      localStorage.setItem('token', json.token.token);
      return true
    }
    else{
      alert("Mauvais identifiant ou mot de passe");
      //TODO : éventuellement un affichage dynamique sur la page ?
      return false
    }
  }

  function logout() {
    authenticated.value = false;
    data.value = {};
    localStorage.removeItem('token');
  }

  return { authenticated, data, login, logout, getSession }
})