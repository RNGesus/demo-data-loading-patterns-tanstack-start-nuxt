import type * as types from '@api/types'
import type { PropsWithChildren } from 'react'
import { createApiClient } from '@api/client'
import { AppLink } from '@app/components/AppLink'
import { createFileRoute } from '@tanstack/react-router'

function TimeTableTemplate({ template: timetableUrlTemplate }: { template?: string }) {
  return (
    <p>
      Time Table Template:
      <code
        style={{
          display: 'block',
          lineHeight: 1.5,
          wordWrap: 'break-word',
          userSelect: 'all',
        }}
      >
        {timetableUrlTemplate ?? '–'}
      </code>
    </p>
  )
}

function ProviderApps({ apps: providerApps }: { apps?: types.ProviderApp[] }) {
  return (
    <>
      <p>
        {providerApps?.length ?? 0}
        {' '}
        Apps
        {(providerApps != null && providerApps.length > 0) && ':'}
      </p>
      {!!providerApps && (
        <ul>
          {providerApps?.map(app => (
            <li key={app.name + app.type}>
              <AppLink app={app} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

function CountrySection({ country, children }: { country: types.Country } & PropsWithChildren) {
  return (
    <section>
      <h2>
        {country.name}
        {' '}
        <small>
          (
          {country.code}
          )
        </small>
      </h2>
      {children}

    </section>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => {
    const apiClient = createApiClient('https://api.railway-stations.org/')
    const countries = await apiClient.getCountries()
    return countries
  },
})

function Home() {
  const countries = Route.useLoaderData()

  return (
    <>
      <h1>Countries with apps</h1>
      <ul>
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
