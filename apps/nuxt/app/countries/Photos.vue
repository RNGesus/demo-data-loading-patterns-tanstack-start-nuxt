<script setup lang="ts">
import type { PhotoStations } from '@project/railway-station-service/types'

defineProps<{
  photos: PhotoStations['stations'][number]['photos']
  photoBaseUrl: string
}>()

const route = useRoute('countries')
</script>

<template>
  <div class="photos">
    <div v-for="photo in photos" :key="photo.id" class="photo-card">
      <figure class="photo-figure">
        <NuxtImg width="384" height="216" class="photo-img" loading="lazy" :src="photoBaseUrl + photo.path" :alt="`Photo of a railway station in ${(route.params.country?.toString() ?? '').toUpperCase()} by ${photo.photographer}`" />
        <figcaption class="photographer-caption">
          {{ `by ${photo.photographer} at ${new Date(photo.createdAt).toLocaleDateString('en-GB')}` }}
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<style scoped>
.photos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(384px, 1fr));
  gap: 0.5rem;
}
.photo-figure {
  margin: 0;
}
.photo-img {
  display: block;
  object-fit: contain;
  aspect-ratio: 16/9;
  width: 100%;
  height: auto;
}
.photographer-caption {
  background-color: #000000aa;
  color: #eaeaea;
  padding: 0.25rem 0.5rem;
}
</style>
