<script setup lang="ts">
import { useCountries } from '~/countries/useCountries'

const { data: countries } = useCountries()
const route = useRoute('country')

async function handleCountryChange(event: Event) {
  if (!event.target || !(event.target instanceof HTMLSelectElement)) {
    return
  }
  const country = event.target.value
  await navigateTo({ name: 'country', params: { country } })
}
</script>

<template>
  <div>
    <div>
      <select :value="route.params.country?.toString() ?? null" @change="handleCountryChange">
        <option v-for="country in countries" :key="country.code" :value="country.code">
          {{ country.name }}
        </option>
      </select>
    </div>

    <slot />
  </div>
</template>
