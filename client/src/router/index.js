import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from "@/views/Login.vue";
import Scan from '@/views/Scan.vue';
import { useAuthStore } from '@/stores/auth.js'

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
      path: '/generate/:id',
      name: 'generate',
      meta: {
        roles: ['professeur']
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Generate.vue')
    },
    {
      path: '/scan',
      name: 'scan',
      component: Scan
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  const isLogged = await authStore.getSession()
  if (to.name !== 'login' && !isLogged) return { name: 'login', query: { redirect: to.path }}

  if (to.meta.roles !== undefined && !to.meta.roles.includes(authStore.data.role)) return '/'
  next()
})

export default router
