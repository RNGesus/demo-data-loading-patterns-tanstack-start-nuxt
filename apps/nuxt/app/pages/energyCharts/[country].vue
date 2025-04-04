<script setup lang="ts">
import { calculateEnergyChartHueRotation } from '@project/helpers/chart'
import { formatEnergyChartDataPoint, formatEnergyChartDataPointDate } from '@project/helpers/formatters'

const route = useRoute('energyCharts-country')
const { data: powerData } = useFetch('/api/energyCharts/power', {
  query: { country: computed(() => route.params.country) },
})
</script>

<template>
  <div className="overflow-x-auto">
    <table className="table table-xs table-pin-cols tabular-nums">
      <thead>
        <tr>
          <th>
            Production Type
          </th>
          <td v-for="unixSecondsEntry in powerData?.unix_seconds" :key="unixSecondsEntry" class="text-right">
            {{ formatEnergyChartDataPointDate(unixSecondsEntry) }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="productionType in powerData?.production_types" :key="productionType.name">
          <th class="z-1">
            {{ productionType.name }}
          </th>
          <td
            v-for="(data, index) in productionType.data"
            :key="index"
            :style="{
              '--color-grade': `${data ? calculateEnergyChartHueRotation({ value: data }) : 0}deg`,
            }"
            class="text-right bg-blue-600 hue-rotate-(--color-grade)"
            :class="[{
              'grayscale-60': !data,
            }]"
          >
            {{ data ? formatEnergyChartDataPoint(data) : 'no data' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
