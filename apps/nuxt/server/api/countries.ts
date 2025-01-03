import { apiClient } from '@project/railway-station-service/client'

export default defineCachedEventHandler(async () => await apiClient.getCountries())
