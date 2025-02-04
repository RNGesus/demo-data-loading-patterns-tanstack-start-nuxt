<script setup lang="ts">
</script>

<template>
  <div class="p-4">
    <header class="navbar bg-base-200">
      <nav class="flex-1">
        <ul class="menu menu-horizontal">
          <li>
            <NuxtLink to="/stationCountries" active-class="menu-active">
              Railway Station Countries ➡️
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/openLibrary" active-class="menu-active">
              Open Library ➡️
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/energyCharts" active-class="menu-active">
              Energy Charts ➡️
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <slot />
  </div>
</template>
