<script setup lang="ts">
const { data: countries } = await useFetch('/api/stationCountries/countries')
const route = useRoute('stationCountries-country')
</script>

<template>
  <div>
    <Dropdown>
      <DropdownTrigger>
        Selected country: <b v-if="route.params.country">{{ route.params.country }}</b>
      </DropdownTrigger>
      <DropdownList>
        <DropdownItem v-for="country in countries" :key="country.code">
          <NuxtLink :to="{ name: 'stationCountries-country', params: { country: country.code } }">
            {{ country.name }}
          </NuxtLink>
        </DropdownItem>
      </DropdownList>
    </Dropdown>
    <pre class="max-h-[300px] overflow-y-auto mb-4">{{ countries && JSON.stringify(countries, null, 2) }}</pre>
    <NuxtPage />
  </div>
</template>
