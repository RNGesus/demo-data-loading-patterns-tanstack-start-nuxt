<script setup lang="ts">
import { useCountries } from '~/countries/useCountries'

const { data: countries } = useCountries()
</script>

<template>
  <div>
    <pre>{{ countries && JSON.stringify(countries, null, 2) }}</pre>
  </div>
</template>
