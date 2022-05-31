import { createRouter, createWebHashHistory } from 'vue-router'
import { companyRoute } from '@/routes/company/companyRoute'

export const router = createRouter({
  routes: [companyRoute],
  history: createWebHashHistory(),
})
