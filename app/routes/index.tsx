import type * as types from '@api/types'
import type { PropsWithChildren } from 'react'
import { apiClient } from '@api/client'
import { AppLink } from '@app/components/AppLink'
import { createFileRoute } from '@tanstack/react-router'

function TimeTableTemplate({ template: timetableUrlTemplate }: { template?: string }) {
  return (
    <p>
      Time Table Template:
      <code
        className="select-all block break-words leading-normal"
      >
        {timetableUrlTemplate ?? '–'}
      </code>
    </p>
  )
}

function ProviderApps({ apps: providerApps }: { apps?: types.ProviderApp[] }) {
  return (
    <div className="flex flex-col gap-1">
      <p>
        {providerApps?.length ?? 0}
        {' '}
        Apps
        {(providerApps != null && providerApps.length > 0) && ':'}
      </p>
      {!!providerApps && (
        <ul>
          {providerApps?.map(app => (
            <li key={app.name + app.type} className="ps-4">
              <AppLink app={app} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function CountrySection({ country, children }: { country: types.Country } & PropsWithChildren) {
  return (
    <section className="flex flex-col gap-2 card bg-base-300 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">
          {country.name}
          {' '}
          <small className="leading-relaxed">
            (
            {country.code}
            )
          </small>
        </h2>
        {children}
      </div>

    </section>
  )
}

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => {
    const countries = await apiClient.getCountries()
    return countries
  },
})

function Home() {
  const countries = Route.useLoaderData()

  return (
    <>
      <h1 className="text-5xl font-bold mb-2 leading-relaxed">Countries with apps</h1>
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
