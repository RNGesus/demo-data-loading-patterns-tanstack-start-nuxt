import { stationPhotosServerFn } from '@app/countries/stationPhotos.serverFn'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_shell/$country')({
  component: RouteComponent,
  loader: async ({ params }) => stationPhotosServerFn({ data: { country: params.country } }),
})

function RouteComponent() {
  const photoStations = Route.useLoaderData()
  const params = Route.useParams()

  return (
    <>
      <h1 className="text-4xl font-bold mb-2 leading-relaxed">
        Photo Stations in
        {' '}
        <em>{params.country}</em>
      </h1>
      <pre>{JSON.stringify(photoStations, null, 2)}</pre>
      <Outlet />
    </>
  )
}
