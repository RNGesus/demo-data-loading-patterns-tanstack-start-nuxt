import { apiClient } from '@project/railway-station-service/client'

export default defineEventHandler(async () => await apiClient.getCountries())
