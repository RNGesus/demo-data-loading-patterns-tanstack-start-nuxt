import type { PhotoStations } from '@project/railway-station-service/types'

interface Props {
  photos: PhotoStations['stations'][number]['photos']
  photoBaseUrl: string
  country: string
}

export function StationPhotos({ photos, photoBaseUrl, country }: Props) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(50ch,1fr))] gap-2">
      {photos.map(photo => (
        <figure key={photo.id}>
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
      ))}
    </div>
  )
}
