import { apiClient } from '@project/railway-station-service/client'
import { toStationPhotos } from '@project/railway-station-service/transforms'
import { createServerFn } from '@tanstack/start'
import { z } from 'zod'

export const stationPhotosServerFn = createServerFn({ method: 'GET' })
  .validator(z.object({ country: z.string() }))
  .handler(async ({ data }) => {
    const photoStations = await apiClient.getPhotoStationByCountry({ params: { country: data.country } })
    const stationPhotos = toStationPhotos(photoStations)
    return stationPhotos
  })
