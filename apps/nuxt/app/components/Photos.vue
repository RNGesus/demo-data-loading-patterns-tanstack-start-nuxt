<script setup lang="ts">
import type { PhotoStations } from '@project/railway-station-service/types'

defineProps<{
  photos: PhotoStations['stations'][number]['photos']
  photoBaseUrl: string
}>()

const route = useRoute('countries')
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fit,_minmax(50ch,_1fr))] gap-2">
    <figure v-for="photo in photos" :key="photo.id">
      <NuxtImg width="384" height="216" placeholder fit="contain" class="aspect-16/9 block w-full h-auto" loading="lazy" :src="photoBaseUrl + photo.path" :alt="`Photo of a railway station in ${(route.params.country?.toString() ?? '').toUpperCase()} by ${photo.photographer}`" />
      <figcaption class="bg-base-300 px-2 py-1">
        {{ `by ${photo.photographer} at ${new Date(photo.createdAt).toLocaleDateString('en-GB')}` }}
      </figcaption>
    </figure>
  </div>
</template>
