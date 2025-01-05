import { countriesServerFn } from '@app/countries/countries.serverFn'
import {
  CountrySection,
  ProviderApps,
  TimeTableTemplate,
} from '@app/countries/CountrySection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_shell/countries/')({
  component: CountriesContent,
  loader: async () => countriesServerFn(),
})

function CountriesContent() {
  const countries = Route.useLoaderData()

  return (
    <>
      <h1>
        Countries with apps
      </h1>
      <ul className="flex flex-col gap-4">
        {countries.map(country => (
          <li key={country.code}>
            <CountrySection country={country}>
              <TimeTableTemplate template={country.timetableUrlTemplate} />
              <ProviderApps apps={country.providerApps} />
            </CountrySection>
          </li>
        ))}
      </ul>
    </>
  )
}
