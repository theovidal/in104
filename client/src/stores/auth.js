import { defineStore } from 'pinia'
import { ref } from "vue";
import { endpoints } from '@/utils/api.js'
import { request } from '@/utils/api.js'

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(false)
  const data = ref({})

  // We try to refresh the access token, if it's not possible then the user must re-authenticate
  async function getSession() {
    try {
      // We try to refresh the token
      const refresh = await request(endpoints.session, 'PATCH');
      if (!refresh.ok) return false;

      // Then to access user data
      const response = await request(endpoints.session)
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
    const response = await request(endpoints.session, 'POST', {
      email,
      password
    });

    // Checking
    if (response.ok){
      data.value = await response.json();
      authenticated.value = true
      return true
    }
    else{
      alert("Mauvais identifiant ou mot de passe");
      return false
    }
  }

  async function logout() {
    await request(endpoints.session, 'DELETE');
    authenticated.value = false;
    for (const key in data.value) {
      delete data.value[key]
    }
  }

  return { authenticated, data, login, logout, getSession }
})