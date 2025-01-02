import { countriesServerFn } from '@app/countries/countryList.serverFn'
import { CountrySection, ProviderApps, TimeTableTemplate } from '@app/countries/CountrySection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_shell/')({
  component: CountriesContent,
  loader: async () => countriesServerFn(),
})

function CountriesContent() {
  const countries = Route.useLoaderData()

  return (
    <>
      <h1 className="text-4xl font-bold mb-2 leading-relaxed">
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
