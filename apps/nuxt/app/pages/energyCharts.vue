<script setup lang="ts">
import { sampleCountries } from '@project/energy-charts-service/countries'
import { formatCountryName } from '@project/helpers/formatters'

const countries = sampleCountries.map(country => ({
  code: country,
  name: formatCountryName(country),
}))
</script>

<template>
  <div>
    <PageHeading>Energy Production per Region in Megawatts(MW)</PageHeading>

    <ul class="menu menu-horizontal bg-base-200 my-2">
      <li class="menu-title">
        Selected country:
      </li>
      <li v-for="countryEntry in countries" :key="countryEntry.code">
        <NuxtLink
          active-class="menu-active"
          :to="{ name: 'energyCharts-country', params: { country: countryEntry.code } }"
        >
          {{ countryEntry.name }}
        </NuxtLink>
      </li>
    </ul>

    <ColorScale />

    <NuxtPage />
  </div>
</template>
