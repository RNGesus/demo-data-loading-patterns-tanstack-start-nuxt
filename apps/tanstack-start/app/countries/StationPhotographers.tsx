import type { PhotoStations } from '@project/railway-station-service/types'

interface Props {
  photographers: PhotoStations['photographers']
}

export function StationPhotographers({ photographers }: Props) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(30ch,1fr))] gap-2">
      {photographers.map(photographer => (
        <div key={photographer.name} className="bg-base-300 card">
          <div className="card-body">
            <h3 className="card-title">
              {photographer.name}
            </h3>
            {photographer.url && (
              <a href={photographer.url} target="_blank" className="link">
                {photographer.url}
                {' '}
                ↗️
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
