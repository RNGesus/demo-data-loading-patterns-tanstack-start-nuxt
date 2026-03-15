<script setup lang="ts">
import { listInjectionKey } from './keys'

const { keepOpenOnRouteChange, ...restListProps } = injectStrict(listInjectionKey)

const route = useRoute()

const popoverRef = useTemplateRef('popover')

watch(
  () => route.path,
  () => {
    if (!keepOpenOnRouteChange) {
      popoverRef.value?.hidePopover()
    }
  },
)
</script>

<template>
  <ul
    ref="popover"
    popover="auto"
    class="dropdown menu bg-base-100 rounded-box z-1 h-[min(500px,60vh)] w-52 overflow-y-auto p-2 shadow-sm"
    v-bind="restListProps"
  >
    <slot />
  </ul>
</template>
