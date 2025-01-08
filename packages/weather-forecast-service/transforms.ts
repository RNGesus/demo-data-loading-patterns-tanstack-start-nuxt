import type { PhotoStations } from './types'

export function toStationPhotos(photoStations: PhotoStations) {
  const { stations, photographers, licenses, photoBaseUrl } = photoStations
  const stationsCount = stations.length
  const photos = stations.flatMap(station => station.photos)
  return { photoBaseUrl, stationsCount, photographers, licenses, photos }
}
