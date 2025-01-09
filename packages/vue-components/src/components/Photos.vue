<script setup lang="ts">
import type { PhotoStations } from '@project/railway-station-service/types'

defineProps<{
  photos: PhotoStations['stations'][number]['photos']
  photoBaseUrl: string
  country: string
}>()
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(50ch,1fr))] gap-2">
    <figure v-for="photo in photos" :key="photo.id">
      <slot width="384" height="216" :src="photoBaseUrl + photo.path" :alt="`Photo of a railway station in ${country.toUpperCase()} by ${photo.photographer}`">
        <b style="color:red;">the default slot is required</b>
      </slot>

      <figcaption class="bg-base-300 px-2 py-1">
        {{ `by ${photo.photographer} at ${new Date(photo.createdAt).toLocaleDateString('en-GB')}` }}
      </figcaption>
    </figure>
  </div>
</template>
