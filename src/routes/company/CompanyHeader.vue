<script lang="ts" setup>
import { useCompanyStore } from '@/stores/useCompanyStore'
import { storeToRefs } from 'pinia'

const companyStore = useCompanyStore()
const { asset } = storeToRefs(companyStore)
</script>

<template>
  <header class="company-header">
    <div class="headline">
      <div class="asset-symbol">{{ asset?.symbol }}</div>
      <div class="asset-name">{{ asset?.name }}</div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.company-header {
  .headline {
    @apply flex flex-row space-x-2;
    .asset-name {
      @apply text-3xl font-bold;
    }

    .asset-symbol {
      @apply text-3xl font-bold text-gray-300;
    }
  }
}
</style>
