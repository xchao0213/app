/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('../views/layouts/index.vue'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/home/index.vue'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/info/page.vue'),
        meta: { title: '设置', keepAlive: false }
      }
    ]
  },
  {
    path: '/page',
    component: () => import('../views/page/index.vue')
  }
]
