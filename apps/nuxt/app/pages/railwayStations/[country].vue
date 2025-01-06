<script lang="ts" setup>
definePageMeta({
  validate: (route) => {
    return typeof route.params.country === 'string'
  },
})

// TODO: look up experimental 'typedRoutes' feature
const route = useRoute('railwayStations/country')

const { data: stationPhotos } = await useFetch(`/api/railwayStations/stationPhotos/${route.params.country?.toString() ?? ''}`)
</script>

<template>
  <div class="prose max-w-full">
    <h1>
      Station Photos for <em>{{ route.params.country }}</em>
    </h1>
    <p>Station count: {{ stationPhotos?.stationsCount }}</p>

    <h2>
      Photographers
    </h2>
    <Photographers v-if="stationPhotos?.photographers" class="not-prose" :photographers="stationPhotos.photographers" />

    <h2>Station photos</h2>
    <Photos v-if="stationPhotos" class="not-prose" :photos="stationPhotos.photos" :photo-base-url="stationPhotos.photoBaseUrl" />
  </div>
</template>
