<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import numeral from 'numeral'

const props = defineProps<{ amount?: number }>()

const valueFormatted = computed<string>(() => {
  if (typeof props.amount === 'number') {
    return numeral(props.amount).format('$0,0.00')
  }

  return ''
})
</script>

<template>
  <div v-show="valueFormatted">{{ valueFormatted }}</div>
</template>

<style lang="scss" scoped></style>
