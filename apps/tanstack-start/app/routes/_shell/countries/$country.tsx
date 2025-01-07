import { StationPhotos } from '@app/countries/StationPhotographers'
import { StationPhotographers } from '@app/countries/StationPhotos'
import { stationPhotosServerFn } from '@app/countries/stationPhotos.serverFn'
import { Await, createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

// TODO: replace with query https://tanstack.com/router/latest/docs/framework/react/start/server-functions#calling-server-functions-from-hooks-and-components
export const Route = createFileRoute('/_shell/countries/$country')({
  component: RouteComponent,
  loader: ({ params }) => ({
    promisedStationPhotos: stationPhotosServerFn({ data: { country: params.country } }),
  }),
})

function RouteComponent() {
  const { promisedStationPhotos } = Route.useLoaderData()
  // FIXME: sadly this does not replace the <Await/> components for now
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
        <Suspense fallback={<span className="animate-spin inline-block opacity-50">😵‍💫</span>}>
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
              <StationPhotographers photographers={photographers} />
            </div>
          )}
        </Await>
      </Suspense>

      <h2>Station photos</h2>
      <Suspense>
        <Await promise={promisedStationPhotos}>
          {({ photos, photoBaseUrl }) => (
            <div className="not-prose">
              <StationPhotos
                photos={photos}
                photoBaseUrl={photoBaseUrl}
                country={params.country}
              />
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  )
}
