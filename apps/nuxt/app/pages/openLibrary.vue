<script lang="ts" setup>
import { unwrapFormData } from '@project/helpers/form'

const route = useRoute('openLibrary')
const { data: results } = await useLazyFetch('/api/openLibrary/search', {
  query: {
    q: computed(() => route.query.q),
    page: computed(() => route.query.page),
  },
})

async function updateQuery(event: Event) {
  await navigateTo({ name: 'openLibrary', query: unwrapFormData(event.target) })
}
</script>

<template>
  <div>
    <!-- TODO: lookup uncontrolled Vue forms, b/c this is pretty bad -->
    <form action="/openLibrary" @submit.stop.prevent="updateQuery">
      <label class="input input-bordered flex items-center gap-2">
        <span role="img" aria-label="Search">🔍</span>
        <input type="search" name="q" :value="$route.query.q" class="grow">
        <kbd class="kbd kbd-sm">Enter</kbd>
      </label>
      <input type="hidden" name="page" :value="1">
    </form>
    <nav>
      <ul class="menu menu-horizontal bg-base-300">
        <li v-for="i in 3" :key="i">
          <NuxtLink
            :to="{
              name: 'openLibrary',
              query: {
                ...$route.query,
                page: i > 1 ? i : undefined },
            }"
            :class="{ 'menu-active': route.query.page === i.toString() || (!route.query.page && i === 1) }"
          >
            page {{ i }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <pre>{{ results }}</pre>
  </div>
</template>
