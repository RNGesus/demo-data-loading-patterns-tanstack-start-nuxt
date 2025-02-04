<script lang="ts" setup>
const route = useRoute('stationCountries-country')
const country = computed(() => route.params.country?.toString() ?? '')

const { data: stationPhotos } = await useFetch(() => `/api/stationCountries/stationPhotos/${country.value}`)
</script>

<template>
  <div class="prose max-w-full">
    <h1>Station Photos for <em>{{ country }}</em></h1>
    <p>Station count: {{ stationPhotos?.stationsCount }}</p>

    <h2>Photographers</h2>
    <RailwayStationsPhotographers v-if="stationPhotos?.photographers" class="not-prose">
      <RailwayStationsPhotographer v-for="photographer in stationPhotos.photographers" :key="photographer.name" :photographer="photographer" />
    </RailwayStationsPhotographers>

    <h2>Station photos</h2>
    <RailwayStationsPhotos v-if="stationPhotos" class="not-prose">
      <RailwayStationsPhoto v-for="photo in stationPhotos.photos" :key="photo.id" :photo="photo" :photo-base-url="stationPhotos.photoBaseUrl" :country="country" />
    </RailwayStationsPhotos>
  </div>
</template>
