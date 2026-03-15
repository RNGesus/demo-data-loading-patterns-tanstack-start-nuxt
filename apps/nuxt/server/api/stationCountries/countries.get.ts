import { getCountries } from '@project/railway-station-service/client'

export default defineEventHandler(async () => await getCountries())
