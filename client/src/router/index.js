import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from "@/views/Login.vue";
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
      component: () => import('../views/Scan.vue'),
      meta: {
        roles: ['eleve']
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  const isLogged = await authStore.getSession()
  if (to.name !== 'login' && !isLogged) next({ name: 'login', query: { redirect: to.path }})
  else if (to.meta.roles !== undefined && !to.meta.roles.includes(authStore.data.role)) next('/')
  else next()
})

export default router
