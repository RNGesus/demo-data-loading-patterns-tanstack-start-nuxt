<script lang="ts" setup>
const route = useRoute('openLibrary')
const { data: results } = useFetch('/api/openLibrary/search', {
  query: {
    q: computed(() => route.query.q),
    page: computed(() => route.query.page),
  },
})

async function updateQuery(event: Event) {
  await navigateTo({ name: 'openLibrary', query: unwrapFormData(event) })
}
</script>

<template>
  <div>
    <!-- TODO: lookup uncontrolled Vue forms, b/c this is pretty bad -->
    <form action="/openLibrary" @submit.stop.prevent="updateQuery">
      <label class="input input-bordered flex items-center gap-2">
        <span class="">
          Search
        </span>
        <input type="search" name="q" :value="$route.query.q" class="grow">
      </label>
      <input type="hidden" name="page" :value="$route.query.page">
    </form>
    <nav class="pagination">
      <NuxtLink :to="{ name: 'openLibrary', query: { ...$route.query, page: undefined } }">
        page 1
      </NuxtLink>
      <NuxtLink :to="{ name: 'openLibrary', query: { ...$route.query, page: 2 } }">
        page 2
      </NuxtLink>
    </nav>
    <pre>{{ results }}</pre>
  </div>
</template>

<style lang="css" scoped>
.pagination {
  display: flex;
  gap: 1rem;
  background-color: #00000011;
  padding: 0.5rem;
}
</style>
