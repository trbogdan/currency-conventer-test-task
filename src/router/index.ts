import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'main',
    path: '/',
    component: () => import('@/pages/MainPage.vue')
  },
  {
    name: 'converter',
    path: '/convert',
    component: () => import('@/pages/Converter.vue')
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})