<script setup lang="ts">
import { listInjectionKey } from './keys'

const listProps = inject(listInjectionKey)
</script>

<template>
  <ul
    popover="auto"
    class="dropdown menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm h-[min(500px,60vh)] overflow-y-auto"
    v-bind="listProps"
  >
    <slot />
  </ul>
</template>
