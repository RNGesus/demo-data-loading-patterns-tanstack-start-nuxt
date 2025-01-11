<script setup lang="ts">
import type { Photographer } from '@project/railway-station-service/types'

defineProps<{
  photographer: Photographer
}>()
</script>

<template>
  <div class="bg-base-300 card">
    <div class="card-body">
      <h3 class="card-title">
        {{ photographer.name }}
      </h3>
      <a v-if="photographer.url" :href="photographer.url" target="_blank" class="link">{{ photographer.url }} ↗️</a>
    </div>
  </div>
</template>
