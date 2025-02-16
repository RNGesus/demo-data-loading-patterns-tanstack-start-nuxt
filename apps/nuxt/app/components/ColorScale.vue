<script setup lang="ts">
import {
  calculateEnergyChartHueRotation,
  ENERGY_CHART_HUE_ROTATION_MAX,
  ENERGY_CHART_HUE_ROTATION_MIN,
} from '@project/helpers/chart'

const {
  steps = 9,
  minValue = ENERGY_CHART_HUE_ROTATION_MIN,
  maxValue = ENERGY_CHART_HUE_ROTATION_MAX,
} = defineProps<{
  steps?: number
  minValue?: number
  maxValue?: number
}>()

const values = Array.from({ length: steps }, (_, i) => {
  return minValue + (maxValue - minValue) * (i / (steps - 1))
})
const ariaLabel = `Color scale from ${minValue} to ${maxValue}`
</script>

<template>
  <div
    role="img"
    class="w-full h-12 grid grid-flow-col auto-cols-fr rounded-lg overflow-hidden font-mono text-xs"
    :aria-label="ariaLabel"
  >
    <div
      v-for="(value, index) in values"
      :key="index"
      :style="{
        '--color-grade': `${calculateEnergyChartHueRotation({ value })}deg`,
      }"
      class="bg-blue-600 hue-rotate-[var(--color-grade)] grid place-items-center"
    >
      {{ Math.round(value).toLocaleString() }}
    </div>
  </div>
</template>
