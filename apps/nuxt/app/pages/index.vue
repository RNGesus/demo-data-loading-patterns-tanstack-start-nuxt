<script setup lang="ts">
const { data: countries } = useFetch('/api/countries')
</script>

<template>
  <div>
    <pre>{{ countries && JSON.stringify(countries, null, 2) }}</pre>
  </div>
</template>

<style>
* {
  min-width: 0;
}
</style>
