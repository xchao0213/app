import { createRouter, createWebHistory } from 'vue-router'
import { constantRouterMap } from './router.config.js'

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouterMap
})

export default router
