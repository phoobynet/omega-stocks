<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Konva from 'konva'

const k = ref<HTMLDivElement>()

let stage: Konva.Stage
let layer: Konva.Layer
onMounted(() => {
  stage = new Konva.Stage({
    container: k.value!,
    width: 100,
    height: 100,
  })

  layer = new Konva.Layer()
  const rect = new Konva.Rect({
    width: 100,
    height: 100,
    fill: 'pink',
  })
  layer.add(rect)
  stage.add(layer)
})
</script>

<template>
  <div ref="k"></div>
</template>

<style lang="scss" scoped></style>
