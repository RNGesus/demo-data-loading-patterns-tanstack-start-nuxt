<script setup lang="ts">
import type { PhotoStations } from '@project/railway-station-service/types'

defineProps<{
  photographers: PhotoStations['photographers']
}>()
</script>

<template>
  <div class="photographers">
    <div v-for="photographer in photographers" :key="photographer.name" class="photographer-card">
      <dl>
        <dt>Name:</dt>
        <dd>{{ photographer.name }}</dd>
        <template v-if="photographer.url">
          <dt>Url:</dt>
          <dd><a :href="photographer.url" target="_blank">{{ photographer.url }}</a></dd>
        </template>
      </dl>
    </div>
  </div>
</template>

<style scoped>
.photographers {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;
}
.photographer-card {
  border: solid 1px #000000aa;
  border-radius: 0.25rem;
  padding: 0.5rem;
}
</style>
