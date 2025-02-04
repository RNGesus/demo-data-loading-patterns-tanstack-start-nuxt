import { apiClient } from '@project/railway-station-service/client'
import { toStationPhotos } from '@project/railway-station-service/transforms'
import { z } from 'zod'

const routeParamsSchema = z.object({
  country: z.string(),
})

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(
    event,
    routeParamsSchema.parse,
  )
  const photoStations = await apiClient.getPhotoStationByCountry({ params: { country: params.country } })
  const stationPhotos = toStationPhotos(photoStations)
  return stationPhotos
})
