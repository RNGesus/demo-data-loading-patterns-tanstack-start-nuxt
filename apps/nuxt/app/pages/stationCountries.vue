<script setup lang="ts">
import { useDropdown } from '~/components/Dropdown/useDropdown'

const { data: countries } = await useFetch('/api/stationCountries/countries')
const route = useRoute('stationCountries-country')
const { buttonProps, listProps } = useDropdown()
</script>

<template>
  <div>
    <Dropdown>
      <DropdownTrigger v-bind="buttonProps">
        Selected country: <b v-if="route.params.country">{{ route.params.country }}</b>
      </DropdownTrigger>
      <DropdownList v-bind="listProps">
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
