import { stationCountriesServerFn } from '@app/integrations/railwayStations/stationCountries.serverFn'
import {
  ProviderApps,
  StationCountrySection,
  TimeTableTemplate,
} from '@app/integrations/railwayStations/StationCountrySection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_shell/_countrySelector/stationCountries/',
)({
  component: RouteComponent,
  loader: async () => stationCountriesServerFn(),
})

function RouteComponent() {
  const countries = Route.useLoaderData()

  return (
    <>
      <h1>Countries with apps</h1>
      <ul className="flex flex-col gap-4">
        {countries.map(country => (
          <li key={country.code}>
            <StationCountrySection country={country}>
              <TimeTableTemplate template={country.timetableUrlTemplate} />
              <ProviderApps apps={country.providerApps} />
            </StationCountrySection>
          </li>
        ))}
      </ul>
    </>
  )
}
