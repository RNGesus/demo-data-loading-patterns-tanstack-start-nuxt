import { Dropdown } from '@app/components/Dropdown'
import { stationCountriesServerFn } from '@app/integrations/railwayStations/stationCountries.serverFn'
import {
  createFileRoute,
  Link,
  Outlet,
  useParams,
} from '@tanstack/react-router'

export const Route = createFileRoute('/_shell/_stationCountrySelector')({
  component: RouteComponent,
  loader: async () => stationCountriesServerFn(),
})

function RouteComponent() {
  const countries = Route.useLoaderData()

  // TODO: find a better way to access the country param
  const { country } = useParams({ strict: false })

  return (
    <>
      <Dropdown>
        <Dropdown.Trigger>
          Selected country:
          {country && <b>{country}</b>}
        </Dropdown.Trigger>
        <Dropdown.List>
          {countries.map(country => (
            <Dropdown.Item key={country.code}>
              <Link
                to="/stationCountries/$country"
                params={{ country: country.code }}
              >
                {country.name}
              </Link>
            </Dropdown.Item>
          ))}
        </Dropdown.List>
      </Dropdown>
      <Outlet />
    </>
  )
}
