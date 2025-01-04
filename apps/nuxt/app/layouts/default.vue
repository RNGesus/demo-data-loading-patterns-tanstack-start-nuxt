<script setup lang="ts">
</script>

<template>
  <div>
    <nav class="navigation">
      <NuxtLink to="/railwayStations">
        Railway Stations ➡️
      </NuxtLink>
      <NuxtLink to="/openLibrary">
        Open Library ➡️
      </NuxtLink>
    </nav>

    <slot />
  </div>
</template>

<style lang="css" scoped>
.navigation {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  background-color: bisque;
  padding: 1rem;
  margin-bottom: 2rem;
}
</style>
