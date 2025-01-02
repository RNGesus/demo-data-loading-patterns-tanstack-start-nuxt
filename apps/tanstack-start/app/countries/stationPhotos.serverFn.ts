import { apiClient } from '@project/railway-station-service/client'
import { toStationPhotos } from '@project/railway-station-service/transforms'
import { createServerFn } from '@tanstack/start'
import { z } from 'vinxi'

export const stationPhotosServerFn = createServerFn({ method: 'GET' })
  .validator(z.object({ country: z.string() }))
  // @ts-expect-error -- FIXME: there is a type error with the inferred types of the 'getPhotoStationByCountry' method
  .handler(async ({ data }) => {
    const photoStations = await apiClient.getPhotoStationByCountry({ params: { country: data.country } })
    const stationPhotos = toStationPhotos(photoStations)
    return stationPhotos
  })
