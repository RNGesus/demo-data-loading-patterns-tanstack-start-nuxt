<script setup lang="ts">
import type { Photo } from '@project/railway-station-service/types'

defineProps<{
  photo: Photo
  photoBaseUrl: string
  country: string
}>()
</script>

<template>
  <figure>
    <NuxtImg
      width="384" height="216" placeholder fit="contain"
      class="aspect-16/9 block w-full h-auto" loading="lazy"
      :src="photoBaseUrl + photo.path"
      :alt="`Photo of a railway station in ${country.toUpperCase()} by ${photo.photographer}`"
    />
    <figcaption class="bg-base-300 px-2 py-1">
      {{ `by ${photo.photographer} at ${new Date(photo.createdAt).toLocaleDateString('en-GB')}` }}
    </figcaption>
  </figure>
</template>
