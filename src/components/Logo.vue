<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = defineProps<{ ticker: string }>()
const logoUrl = computed(() => {
  return new URL(`/logos/${props.ticker}.png`, import.meta.url).href
})
const hasError = ref<boolean>(false)
const onError = () => {
  hasError.value = true
}
</script>

<template>
  <div class="logo">
    <img
      v-if="!hasError"
      :src="logoUrl"
      :alt="ticker"
      @error.prevent="onError"
    />
    <div v-if="hasError">
      {{ ticker[0] }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  @apply rounded-full border border-gray-700;
  img {
    width: 36px;
    height: 36px;
    @apply rounded-full object-cover object-scale-down;
  }

  > div {
    @apply flex flex-col items-center justify-center rounded-full bg-gray-700 object-fill text-2xl font-bold;
  }
}
</style>
