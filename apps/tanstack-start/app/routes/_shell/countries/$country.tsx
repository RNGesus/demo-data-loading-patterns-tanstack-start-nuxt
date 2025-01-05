import { StationPhotos } from '@app/countries/StationPhotographers'
import { StationPhotographers } from '@app/countries/StationPhotos'
import { stationPhotosServerFn } from '@app/countries/stationPhotos.serverFn'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_shell/countries/$country')({
  component: RouteComponent,
  loader: async ({ params }) =>
    stationPhotosServerFn({ data: { country: params.country } }),
})

function RouteComponent() {
  const stationPhotos = Route.useLoaderData()
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
        {stationPhotos?.stationsCount}
      </p>

      <h2>Photographers</h2>
      {!!stationPhotos?.photographers && (
        <div className="not-prose">
          <StationPhotographers photographers={stationPhotos.photographers} />
        </div>
      )}

      <h2>Station photos</h2>
      {!!stationPhotos && (
        <div className="not-prose">
          <StationPhotos
            photos={stationPhotos.photos}
            photoBaseUrl={stationPhotos.photoBaseUrl}
            country={params.country}
          />
        </div>
      )}
    </div>
  )
}
