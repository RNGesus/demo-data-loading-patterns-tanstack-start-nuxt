<script lang="ts" setup>
import Photographers from '~/components/Photographers.vue'
import Photos from '~/components/Photos.vue'

definePageMeta({
  validate: (route) => {
    return typeof route.params.country === 'string'
  },
})

// TODO: look up experimental 'typedRoutes' feature
const route = useRoute('railwayStations/country')

const { data: stationPhotos } = useFetch(`/api/railwayStations/stationPhotos/${route.params.country?.toString() ?? ''}`)
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
