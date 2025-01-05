<script setup lang="ts">
import type { PhotoStations } from '@project/railway-station-service/types'

defineProps<{
  photographers: PhotoStations['photographers']
}>()
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,_minmax(30ch,_1fr))] gap-2">
    <div v-for="photographer in photographers" :key="photographer.name" class="bg-base-300 card">
      <div class="card-body">
        <h3 class="card-title">
          {{ photographer.name }}
        </h3>
        <a v-if="photographer.url" :href="photographer.url" target="_blank" class="link">{{ photographer.url }} ↗️</a>
      </div>
    </div>
  </div>
</template>
