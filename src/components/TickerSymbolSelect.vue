<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { debouncedWatch } from '@vueuse/shared'
import { onKeyStroke } from '@vueuse/core'
import Fuse from 'fuse.js'
import type { Asset } from '@phoobynet/alpaca-fluent'
import { assets } from '@phoobynet/alpaca-fluent'
import { flatten } from 'lodash'

let fuse: Fuse<Asset>
const results = ref<Asset[]>([])
// input fires on every character enter, change indicates a valid selection
const emit = defineEmits(['input', 'change'])
const hasResults = computed(() => results.value?.length > 0)
const query = ref<string>('')
const listItems = ref([])
const inputRef = ref<HTMLInputElement>()
const selectedIndex = ref<number>()
const selectedSymbol = ref<string>()

onKeyStroke('Escape', () => {
  results.value = []
  selectedIndex.value = undefined
})

onKeyStroke('Enter', () => {
  if (hasResults.value && selectedIndex.value !== undefined) {
    query.value = results.value[selectedIndex.value].symbol
    selectedSymbol.value = query.value
    inputRef.value?.select()
    emit('change', selectedSymbol.value)
  }
})

const navigateDown = () => {
  if (hasResults.value) {
    if (selectedIndex.value === undefined) {
      selectedIndex.value = 0
    } else if (selectedIndex.value < results.value.length - 1) {
      selectedIndex.value = selectedIndex.value + 1
    }
  }
}

const navigateUp = () => {
  if (hasResults.value) {
    if (selectedIndex.value) {
      selectedIndex.value = selectedIndex.value - 1
    } else {
      selectedIndex.value = 0
    }
  }
}

debouncedWatch(
  query,
  async (newValue) => {
    emit('input')
    selectedIndex.value = undefined
    if (newValue && newValue !== selectedSymbol.value) {
      const fuseResults = fuse.search(newValue, {
        limit: 20,
      })

      results.value = flatten(fuseResults.map((x) => x.item))
    } else {
      results.value = []
    }

    selectedSymbol.value = undefined
  },
  {
    debounce: 500,
  },
)

onMounted(async () => {
  inputRef.value?.focus()
  const allAssets = await assets.all()
  fuse = new Fuse<Asset>(allAssets, {
    keys: ['symbol', 'name'],
  })
})
</script>

<template>
  <div class="relative">
    <div
      class="border-gray-600"
      :class="{
        'rounded-t border-l border-t border-r border-gray-600': hasResults,
        'rounded border': !hasResults,
      }"
    >
      <input
        ref="inputRef"
        v-model="query"
        type="text"
        class="m-0 h-8 w-full bg-inherit px-2 text-xl outline-none"
        placeholder="Search, e.g. AAPL"
        @mouseenter="(e) => e.target.select()"
        @keydown.prevent.down="navigateDown"
        @keydown.prevent.up="navigateUp"
      />
    </div>
    <ul
      v-if="hasResults"
      class="absolute w-full rounded-b border-l border-b border-r border-gray-600"
      style="background-color: rgb(33, 33, 33)"
    >
      <li
        v-for="(asset, i) of results"
        :key="asset.symbol"
        :ref="
          (el) => {
            listItems[i] = el
          }
        "
        :class="{ 'bg-slate-700': i === selectedIndex }"
        class="ml-2 flex flex-row justify-start space-x-2 leading-tight"
      >
        <div style="min-width: 75px" class="font-light text-gray-400">
          {{ asset.exchange }}
        </div>
        <div style="min-width: 75px" class="font-bold text-orange-400">
          {{ asset.symbol }}
        </div>
        <div>{{ asset.name }}</div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
