<script setup lang="ts">
</script>

<template>
  <div>
    <header class="navbar bg-base-200">
      <nav class="navbar-start">
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
        </ul>
      </nav>
    </header>

    <div class="px-4">
      <slot />
    </div>
  </div>
</template>
