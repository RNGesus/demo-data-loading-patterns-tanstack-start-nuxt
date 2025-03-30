<script setup lang="ts">
import type { StyleValue } from 'vue'
import { buttonInjectionKey, listInjectionKey } from './Dropdown/keys'

const { keepOpenOnRouteChange = false } = defineProps<{
  keepOpenOnRouteChange?: boolean
}>()

const popoverId = useId()
const anchorId = useId()
const anchorName = `--${anchorId}`

provide(buttonInjectionKey, {
  popoverTarget: popoverId,
  // @ts-expect-error -- anchorName is not in StyleValue yet
  style: { anchorName } satisfies StyleValue,
})
provide(listInjectionKey, {
  id: popoverId,
  keepOpenOnRouteChange,
  // @ts-expect-error -- positionAnchor is not in StyleValue yet
  style: { positionAnchor: anchorName } satisfies StyleValue,
})
</script>

<template>
  <slot />
</template>
