<script setup lang="ts">
import { apiClient } from '@project/railway-station-service/client'

const { data: countries } = useAsyncData(() => apiClient.getCountries())
</script>

<template>
  <div>
    <pre>{{ countries && JSON.stringify(countries, null, 2) }}</pre>
  </div>
</template>
