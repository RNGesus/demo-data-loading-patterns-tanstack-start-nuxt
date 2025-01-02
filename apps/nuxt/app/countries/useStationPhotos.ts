import { apiClient } from '@project/railway-station-service/client'
import { toStationPhotos } from '@project/railway-station-service/transforms'

export function useStationPhotos(country: string) {
  return useAsyncData(async () => {
    const photoStations = await apiClient.getPhotoStationByCountry({ params: { country } })
    const stationPhotos = toStationPhotos(photoStations)
    return stationPhotos
  })
}
