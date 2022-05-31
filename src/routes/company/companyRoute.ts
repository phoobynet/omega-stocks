import type { RouteRecordRaw } from 'vue-router'
import Company from '@/routes/company/Company.vue'

export const companyRoute: RouteRecordRaw = {
  path: '/',
  name: 'Company',
  component: Company,
}
