<script lang="ts" setup>
import { useCompanyStore } from '@/stores/useCompanyStore'
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, onMounted } from 'vue'
import CompanySummary from '@/routes/company/CompanySummary.vue'
import CompanyHeader from '@/routes/company/CompanyHeader.vue'
import PageContainer from '@/components/PageContainer.vue'
import VerticalStack from '@/components/VerticalStack.vue'
import TickerSymbolSelect from '@/components/TickerSymbolSelect.vue'

const companyStore = useCompanyStore()

const { asset, loading, trade } = storeToRefs(companyStore)

const updateSymbol = async (symbol: string) => {
  await companyStore.initialise(symbol)
  await companyStore.observe()
}

onBeforeUnmount(async () => {
  await companyStore.unobserve()
})
</script>

<template>
  <page-container>
    <div class="mt-4">
      <vertical-stack>
        <ticker-symbol-select @change="updateSymbol" />
        <company-header />
        <company-summary />
      </vertical-stack>
    </div>
  </page-container>
</template>

<style lang="scss" scoped></style>
