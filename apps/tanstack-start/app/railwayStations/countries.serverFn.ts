import { apiClient } from '@project/railway-station-service/client'
import { createServerFn } from '@tanstack/start'

export const countriesServerFn = createServerFn({ method: 'GET' })
  .handler(async () => await apiClient.getCountries())
