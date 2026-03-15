import { getPhotoStationByCountry } from '@project/railway-station-service/client'
import { toStationPhotos } from '@project/railway-station-service/transforms'
import { createServerFn } from '@tanstack/react-start'
import * as z from 'zod'

export const stationPhotosServerFn = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ country: z.string() }))
  .handler(async ({ data }) => {
    const photoStations = await getPhotoStationByCountry({
      path: { country: data.country },
    })
    const stationPhotos = toStationPhotos(photoStations)
    return stationPhotos
  })
