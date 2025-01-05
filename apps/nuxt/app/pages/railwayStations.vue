<script setup lang="ts">
const { data: countries } = useFetch('/api/railwayStations/countries')
const route = useRoute('country')

async function handleCountryChange(event: Event) {
  if (!event.target || !(event.target instanceof HTMLSelectElement)) {
    return
  }
  const country = event.target.value
  await navigateTo({ name: 'railwayStations-country', params: { country } })
}
</script>

<template>
  <div>
    <select class="select mb-4" :value="route.params.country?.toString() ?? null" @change="handleCountryChange">
      <option v-for="country in countries" :key="country.code" :value="country.code">
        {{ country.name }}
      </option>
    </select>
    <pre class="max-h-[300px] overflow-y-auto mb-4">{{ countries && JSON.stringify(countries, null, 2) }}</pre>
    <NuxtPage />
  </div>
</template>

<style>
* {
  min-width: 0;
}
</style>
