import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import Extract from '../views/Extract.vue'
import Watermark from '../views/Watermark.vue'
import Voice from '../views/Voice.vue'
import MD5 from '../views/MD5.vue'

const router = createRouter({
  history: createWebHistory(),
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
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/extract',
      name: 'extract',
      component: Extract,
      meta: { requiresAuth: true }
    },
    {
      path: '/watermark',
      name: 'watermark',
      component: Watermark,
      meta: { requiresAuth: true }
    },
    {
      path: '/voice',
      name: 'voice',
      component: Voice,
      meta: { requiresAuth: true }
    },
    {
      path: '/md5',
      name: 'md5',
      component: MD5,
      meta: { requiresAuth: true }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router 