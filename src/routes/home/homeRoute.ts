import type { RouteRecordRaw } from 'vue-router'
import Home from '@/routes/home/Home.vue'

export const homeRoute: RouteRecordRaw = {
  path: '/',
  component: Home,
  name: 'Home',
}
