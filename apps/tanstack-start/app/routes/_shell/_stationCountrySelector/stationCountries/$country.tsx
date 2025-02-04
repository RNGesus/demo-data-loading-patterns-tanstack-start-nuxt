import {
  StationPhotographer,
  StationPhotographers,
} from '@app/integrations/railwayStations/StationPhotographers'
import {
  StationPhoto,
  StationPhotos,
} from '@app/integrations/railwayStations/StationPhotos'
import { stationPhotosServerFn } from '@app/integrations/railwayStations/stationPhotos.serverFn'
import { Await, createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

// TODO: replace with query https://tanstack.com/router/latest/docs/framework/react/start/server-functions#calling-server-functions-from-hooks-and-components
export const Route = createFileRoute(
  '/_shell/_stationCountrySelector/stationCountries/$country',
)({
  component: RouteComponent,
  loader: ({ params }) => ({
    promisedStationPhotos: stationPhotosServerFn({
      data: { country: params.country },
    }),
  }),
})

function RouteComponent() {
  const { promisedStationPhotos } = Route.useLoaderData()
  /** FIXME: sadly this does not replace the <Await/> components for now @see /energyCharts/$country.tsx for a better example */
  // const stationPhotos = use(promisedStationPhotos)
  const params = Route.useParams()

  return (
    <div className="prose max-w-full">
      <h1>
        Station Photos for
        {' '}
        <em>{params.country}</em>
      </h1>
      <p>
        Station count:
        {' '}
        <Suspense
          fallback={
            <span className="animate-spin inline-block opacity-50">😵‍💫</span>
          }
        >
          <Await promise={promisedStationPhotos}>
            {({ stationsCount }) => stationsCount}
          </Await>
        </Suspense>
      </p>

      <h2>Photographers</h2>
      <Suspense>
        <Await promise={promisedStationPhotos}>
          {({ photographers }) => (
            <div className="not-prose">
              <StationPhotographers>
                {photographers.map(photographer => (
                  <StationPhotographer
                    key={photographer.name}
                    photographer={photographer}
                  />
                ))}
              </StationPhotographers>
            </div>
          )}
        </Await>
      </Suspense>

      <h2>Station photos</h2>
      <Suspense>
        <Await promise={promisedStationPhotos}>
          {({ photos, photoBaseUrl }) => (
            <div className="not-prose">
              <StationPhotos>
                {photos.map(photo => (
                  <StationPhoto
                    key={photo.id}
                    photo={photo}
                    photoBaseUrl={photoBaseUrl}
                    country={params.country}
                  />
                ))}
              </StationPhotos>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  )
}
