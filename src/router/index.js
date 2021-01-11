import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRouterMap } from './router.config.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap
})

export default router
