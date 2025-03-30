<script setup lang="ts">
import { listInjectionKey } from './keys'

const { keepOpenOnRouteChange, ...restListProps } = injectStrict(listInjectionKey)

const route = useRoute()

const popoverRef = useTemplateRef('popover')

watch(() => route.path, () => {
  if (!keepOpenOnRouteChange) {
    popoverRef.value?.hidePopover()
  }
})
</script>

<template>
  <ul
    ref="popover"
    popover="auto"
    class="dropdown menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm h-[min(500px,60vh)] overflow-y-auto"
    v-bind="restListProps"
  >
    <slot />
  </ul>
</template>
