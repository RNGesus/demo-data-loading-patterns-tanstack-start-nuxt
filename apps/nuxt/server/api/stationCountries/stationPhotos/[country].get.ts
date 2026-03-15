import { getPhotoStationByCountry } from '@project/railway-station-service/client'
import { toStationPhotos } from '@project/railway-station-service/transforms'
import * as z from 'zod'

const routeParamsSchema = z.object({
  country: z.string(),
})

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, routeParamsSchema.parse)
  const photoStations = await getPhotoStationByCountry({
    path: { country: params.country },
  })
  const stationPhotos = toStationPhotos(photoStations)
  return stationPhotos
})
