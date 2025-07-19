import type { PhotoStations } from '@project/railway-station-service/types'
import type { PropsWithChildren } from 'react'

interface StationPhotoProps {
  photo: PhotoStations['stations'][number]['photos'][number]
  photoBaseUrl: string
  country: string
}

export function StationPhoto({ photo, photoBaseUrl, country }: StationPhotoProps) {
  return (
    <figure className="rounded-md">
      <img
        width={384}
        height={216}
        className="aspect-16/9 block w-full h-auto"
        loading="lazy"
        src={photoBaseUrl + photo.path}
        alt={`Photo of a railway station in ${(country).toUpperCase()} by ${photo.photographer}`}
      />
      <figcaption className="bg-base-300 px-2 py-1">
        {`by ${photo.photographer} at ${new Date(photo.createdAt).toLocaleDateString('en-GB')}`}
      </figcaption>
    </figure>
  )
}

export function StationPhotos({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(50ch,1fr))] gap-2">
      {children}
    </div>
  )
}
