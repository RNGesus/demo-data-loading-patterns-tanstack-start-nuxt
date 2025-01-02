import { apiClient } from '@project/railway-station-service/client'

export function useCountries() {
  return useAsyncData(() => apiClient.getCountries())
}
