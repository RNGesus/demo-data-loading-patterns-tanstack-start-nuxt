<script setup lang="ts">
</script>

<template>
  <div class="p-4">
    <header class="navbar bg-base-200">
      <nav class="flex-1">
        <ul class="menu menu-horizontal">
          <li>
            <NuxtLink to="/railwayStations">
              Railway Stations ➡️
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/openLibrary">
              Open Library ➡️
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/energyCharts">
              Energy Charts ➡️
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <slot />
  </div>
</template>
