import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from "@/views/Login.vue";
import { endpoints } from "@/data/api.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/generate',
      name: 'generate',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Generate.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  try {
    const response = await fetch(endpoints.profile, {
      method: "GET"
    })
    console.log(response)

    next()
  } catch {
    return { name: 'login' }
  }
})

export default router
