<script setup lang="ts">
import { buttonInjectionKey } from './keys'

const buttonProps = inject(buttonInjectionKey)
</script>

<template>
  <button type="button" class="btn m-1" v-bind="buttonProps">
    <slot />
  </button>
</template>
