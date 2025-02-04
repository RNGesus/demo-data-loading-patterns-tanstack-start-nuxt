<script setup lang="ts">
const { data: countries } = await useFetch('/api/stationCountries/countries')
const route = useRoute('stationCountries-country')

async function handleCountryChange(event: Event) {
  if (!event.target || !(event.target instanceof HTMLSelectElement)) {
    return
  }
  const country = event.target.value
  await navigateTo({ name: 'stationCountries-country', params: { country } })
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
