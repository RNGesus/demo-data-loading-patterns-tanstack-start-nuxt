import { apiClient } from '@project/railway-station-service/client'
import { createServerFn } from '@tanstack/start'

export const countriesServerFn = createServerFn({ method: 'GET' })
// @ts-expect-error -- FIXME: there is a type error with the inferred types of the 'getCountries' method
  .handler(async () => await apiClient.getCountries())
