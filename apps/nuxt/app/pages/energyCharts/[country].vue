<script setup lang="ts">
const route = useRoute('energyCharts-country')
const { data: powerData } = useFetch('/api/energyCharts/power', {
  query: { country: computed(() => route.params.country) },
})
</script>

<template>
  <div className="overflow-x-auto">
    <table className="table table-xs table-pin-cols">
      <thead>
        <tr>
          <th rowspan="2">
            Production Type
          </th>
          <th :colspan="powerData?.unix_seconds?.length">
            Data Point at
          </th>
        </tr>
        <tr>
          <th v-for="unixSecondsEntry in powerData?.unix_seconds" :key="unixSecondsEntry">
            {{ new Date(unixSecondsEntry * 1000).toLocaleString(
              'en-GB',
              {
                timeStyle: 'short',
                timeZone: 'Europe/Berlin',
              },
            ) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="productionType in powerData?.production_types" :key="productionType.name">
          <th>{{ productionType.name }}</th>
          <td v-for="(data, index) in productionType.data" :key="index">
            {{ data ?? 'no data' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
