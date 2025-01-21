<script setup lang="ts">
const route = useRoute('energyCharts-country')
const { data } = useFetch('/api/energyCharts/power', {
  query: { country: computed(() => route.params.country) },
})
</script>

<template>
  <div>{{ data }}</div>
</template>
