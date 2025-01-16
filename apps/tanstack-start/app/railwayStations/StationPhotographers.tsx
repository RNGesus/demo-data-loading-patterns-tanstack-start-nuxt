import type { Photographer } from '@project/railway-station-service/types'
import type { PropsWithChildren } from 'react'

interface StationPhotographerProps {
  photographer: Photographer
}

export function StationPhotographer({ photographer }: StationPhotographerProps) {
  return (
    <div className="bg-base-300 card">
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
  )
}

export function StationPhotographers({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(30ch,1fr))] gap-2">
      {children}
    </div>
  )
}
