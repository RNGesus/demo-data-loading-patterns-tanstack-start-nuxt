import { apiClient } from '@project/railway-station-service/client'
import { createServerFn } from '@tanstack/start'
import { z } from 'vinxi'

export const photoStationServerFn = createServerFn({ method: 'GET' })
  .validator(z.object({ country: z.string() }))
  // @ts-expect-error -- FIXME: there is a type error with the inferred types of the 'getPhotoStationByCountry' method
  .handler(async ({ data }) => {
    const photoStations = await apiClient.getPhotoStationByCountry({ params: { country: data.country } })
    const { stations, photographers, licenses, photoBaseUrl } = photoStations
    const stationsCount = stations.length
    const photos = stations.flatMap(station => station.photos)
    return { photoBaseUrl, stationsCount, photographers, licenses, photos }
  })
