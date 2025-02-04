<script setup lang="ts">
const countries = [
  { code: 'de', name: 'Germany' },
  { code: 'fr', name: 'France' },
  { code: 'es', name: 'Spain' },
  { code: 'pl', name: 'Poland' },
  { code: 'pt', name: 'Portugal' },
  { code: 'ro', name: 'Romania' },
] as const
</script>

<template>
  <div>
    <ul className="menu menu-horizontal bg-base-200 my-2">
      <li className="menu-title">
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

    <NuxtPage />
  </div>
</template>
