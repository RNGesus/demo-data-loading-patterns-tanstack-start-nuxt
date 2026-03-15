<script setup lang="ts">
import {
  calculateEnergyChartHueRotation,
  ENERGY_CHART_HUE_ROTATION_MAX,
  ENERGY_CHART_HUE_ROTATION_MIN,
} from '@project/helpers/chart'
import { formatEnergyChartDataPoint } from '@project/helpers/formatters'

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
const ariaLabel = `Color scale from ${minValue} to ${maxValue} MegaWatts (MW)`
</script>

<template>
  <div
    role="img"
    class="rounded-box grid h-12 w-full auto-cols-fr grid-flow-col overflow-hidden text-xs slashed-zero tabular-nums"
    :aria-label="ariaLabel"
  >
    <div
      v-for="(value, index) in values"
      :key="index"
      :style="{
        '--color-grade': `${calculateEnergyChartHueRotation({ value })}deg`,
      }"
      class="grid place-items-center bg-blue-600 hue-rotate-(--color-grade)"
    >
      {{ formatEnergyChartDataPoint(Math.round(value)) }}
    </div>
  </div>
</template>
