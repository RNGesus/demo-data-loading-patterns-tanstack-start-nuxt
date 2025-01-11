<script lang="ts" setup>
const route = useRoute('railwayStations-country')
const country = computed(() => route.params.country?.toString() ?? '')

const { data: stationPhotos } = await useFetch(`/api/railwayStations/stationPhotos/${country.value}`)
</script>

<template>
  <div class="prose max-w-full">
    <h1>
      Station Photos for <em>{{ country }}</em>
    </h1>
    <p>Station count: {{ stationPhotos?.stationsCount }}</p>

    <h2>
      Photographers
    </h2>
    <Photographers v-if="stationPhotos?.photographers" class="not-prose">
      <Photographer v-for="photographer in stationPhotos.photographers" :key="photographer.name" :photographer="photographer" />
    </Photographers>

    <h2>Station photos</h2>
    <Photos v-if="stationPhotos" class="not-prose">
      <Photo v-for="photo in stationPhotos.photos" :key="photo.id" :photo="photo" :photo-base-url="stationPhotos.photoBaseUrl" :country="country" />
    </Photos>
  </div>
</template>
