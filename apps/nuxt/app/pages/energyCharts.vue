<script setup lang="ts">
const route = useRoute('energyCharts')
const countryParam = computed(() => 'country' in route.params ? route.params.country?.toString() : undefined)
const countries = [
  { code: 'de', name: 'Germany' },
  { code: 'fr', name: 'France' },
  { code: 'es', name: 'Spain' },
  { code: 'pl', name: 'Poland' },
  { code: 'pt', name: 'Portugal' },
  { code: 'ro', name: 'Romania' },
] as const
</script>

<template>
  <div>
    <Dropdown>
      <DropdownTrigger>
        Selected country:
        <b>{{ countryParam }}</b>
      </DropdownTrigger>
      <DropdownList>
        <DropdownItem v-for="country in countries" :key="country.code">
          <NuxtLink :to="{ name: 'energyCharts-country', params: { country: country.code } }">
            {{ country.name }}
          </NuxtLink>
        </DropdownItem>
      </DropdownList>
    </Dropdown>

    <NuxtPage />
  </div>
</template>
