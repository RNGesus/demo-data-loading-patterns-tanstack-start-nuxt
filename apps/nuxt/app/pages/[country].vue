<script lang="ts" setup>
import { useStationPhotos } from '~/countries/useStationPhotos'

definePageMeta({
  validate: (route) => {
    return typeof route.params.country === 'string'
  },
})

// TODO: look up experimental 'typedRoutes' feature
const route = useRoute('country')

const { data: stationPhotos } = useStationPhotos(route.params.country?.toString() ?? '')
</script>

<template>
  <pre>
    {{ stationPhotos && JSON.stringify(stationPhotos, null, 2) }}
  </pre>
</template>
