<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { Trade } from '@phoobynet/alpaca-fluent'
import { stockTicker } from '@phoobynet/alpaca-fluent'

const trade = ref<Trade>()

onMounted(async () => {
  trade.value = await stockTicker('AAPL').trades.latest()
})
</script>

<template>
  <div>
    <header>
      <h1>Home</h1>
    </header>
    <main>
      <pre>{{ JSON.stringify(trade, null, 2) }}</pre>
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
