import { apiClient } from '@project/railway-station-service/client'
import { createServerFn } from '@tanstack/react-start'

export const stationCountriesServerFn = createServerFn({ method: 'GET' })
  .handler(async () => await apiClient.getCountries())
