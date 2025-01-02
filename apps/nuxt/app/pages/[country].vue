<script lang="ts" setup>
import Photographers from '~/countries/Photographers.vue'
import Photos from '~/countries/Photos.vue'
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
  <div>
    <h1>Station Photos for <em>{{ route.params.country }}</em></h1>
    <p>Station count: {{ stationPhotos?.stationsCount }}</p>
    <div class="content-layout">
      <Photographers v-if="stationPhotos?.photographers" :photographers="stationPhotos.photographers" />
      <Photos v-if="stationPhotos" :photos="stationPhotos.photos" :photo-base-url="stationPhotos.photoBaseUrl" />
    </div>
  </div>
</template>

<style scoped>
.content-layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
