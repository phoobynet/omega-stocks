<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useCompanyStore } from '@/routes/home/useCompanyStore'
import { storeToRefs } from 'pinia'
import numeral from 'numeral'
import KonvaDemo from '@/components/KonvaDemo.vue'

const companyStore = useCompanyStore()

const { asset, loading, trade } = storeToRefs(companyStore)

onMounted(async () => {
  await companyStore.initialise('BTCUSD')
  await companyStore.observe()
})
onBeforeUnmount(async () => {
  await companyStore.unobserve()
})
</script>

<template>
  <div class="pt-2">
    <template v-if="loading">
      <p>Loading</p>
    </template>
    <template v-else>
      <header>
        <h3>{{ asset?.symbol }} - {{ asset?.name }}</h3>
        <h6 class="opacity-50">
          {{ asset?.exchange }} -
          <span class="text-uppercase">{{ asset?.class }}</span>
        </h6>
        <h3 class="tabular-nums">
          {{ numeral(trade?.p).format('$0,0.00') }}
        </h3>
      </header>
      <main>
        <pre>{{ JSON.stringify(trade, null, 2) }}</pre>
        <konva-demo></konva-demo>
      </main>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
