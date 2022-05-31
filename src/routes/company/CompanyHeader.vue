<script lang="ts" setup>
import Logo from '@/components/Logo.vue'
import { useCompanyStore } from '@/stores/useCompanyStore'
import { storeToRefs } from 'pinia'
import Money from '@/components/Money.vue'

const companyStore = useCompanyStore()
const { asset, trade, tickerObserverState, previousDailyBar, priceChange } =
  storeToRefs(companyStore)
</script>

<template>
  <header class="company-header">
    <div class="headline">
      <logo :ticker="asset?.symbol"></logo>
      <div class="asset-symbol">{{ asset?.symbol }}</div>
      <div class="asset-name">{{ asset?.name }}</div>
    </div>
    <div class="trade">
      <div>
        <money :amount="trade?.p" class="price" />
      </div>
      <div class="price-change">
        <div class="amount"></div>
        <div class="percent"></div>
        <pre>{{ JSON.stringify(priceChange, null, 2) }}</pre>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.company-header {
  .headline {
    @apply flex flex-row space-x-2;
    .asset-symbol {
      @apply text-3xl font-bold text-gray-300 text-orange-400;
    }

    .asset-name {
      @apply text-3xl font-bold;
      &::before {
        content: ' - ';
      }
    }
  }

  .trade {
    @apply flex flex-row space-x-2;
    .price {
      @apply text-3xl tabular-nums font-bold;
    }

    .price-change {
      @apply text-2xl;

      &.up {
        @apply text-green-500;
      }

      &.down {
        @apply text-red-500;
      }

      .amount {
      }

      .percent {
      }
    }
  }
}
</style>
