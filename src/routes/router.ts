import { createRouter, createWebHashHistory } from 'vue-router'
import { homeRoute } from '@/routes/home/homeRoute'

export const router = createRouter({
  routes: [homeRoute],
  history: createWebHashHistory(),
})
