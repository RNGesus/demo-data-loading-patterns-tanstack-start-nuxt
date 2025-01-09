<script lang="ts" setup>
import Photos from '@project/vue-components/Photos'

definePageMeta({
  validate: (route) => {
    return typeof route.params.country === 'string'
  },
})

// TODO: look up experimental 'typedRoutes' feature
const route = useRoute('railwayStations/country')
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
    <Photographers v-if="stationPhotos?.photographers" class="not-prose" :photographers="stationPhotos.photographers" />

    <h2>Station photos</h2>
    <Photos v-if="stationPhotos" class="not-prose" :photos="stationPhotos.photos" :photo-base-url="stationPhotos.photoBaseUrl" :country>
      <template #default="{ src, alt, width, height }">
        <NuxtImg
          :width="width" :height="height" placeholder fit="contain"
          class="aspect-16/9 block w-full h-auto" loading="lazy"
          :src="src"
          :alt="alt"
        />
      </template>
    </Photos>
  </div>
</template>
