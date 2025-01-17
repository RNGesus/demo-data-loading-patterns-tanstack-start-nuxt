import { Dropdown } from '@app/components/Dropdown'
import { query } from '@app/energyCharts/power.querySchema'
import { powerServerFn } from '@app/energyCharts/power.serverFn'
import { Await, createFileRoute, Link, stripSearchParams } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { Suspense } from 'react'

export const Route = createFileRoute('/_shell/energyCharts/')({
  component: RouteComponent,
  validateSearch: zodValidator(query),
  search: {
    middlewares: [stripSearchParams({ country: '' })],
  },
  loaderDeps: ({ search: { country } }) => ({ country }),
  loader: async ({ deps }) => ({
    promisedPowerData: powerServerFn({ data: { country: deps.country } }),
  }),
})

const countries = [
  { code: 'de', name: 'Germany' },
  { code: 'fr', name: 'France' },
  { code: 'es', name: 'Spain' },
  { code: 'it', name: 'Italy' },
  { code: 'gb', name: 'United Kingdom' },
] as const

function CountrySelector() {
  const { country } = Route.useSearch()
  return (
    <Dropdown>
      <Dropdown.Trigger>
        Selected country:
        {country && <b>{country}</b>}
      </Dropdown.Trigger>
      <Dropdown.List>
        {countries.map(country => (
          <Dropdown.Item key={country.code}>
            <Link to="/energyCharts" search={{ country: country.code }}>
              {country.name}
            </Link>
          </Dropdown.Item>
        ))}
      </Dropdown.List>
    </Dropdown>
  )
}

function RouteComponent() {
  const { promisedPowerData } = Route.useLoaderData()

  return (
    <div className="prose max-w-full">
      <h1>Energy Charts Power Data</h1>

      <CountrySelector />

      <Suspense fallback={<div>Loading power data...</div>}>
        <Await promise={promisedPowerData}>
          {powerData => (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Production Type</th>
                    {powerData.unix_seconds?.map(unixSecondsEntry => (
                      <th key={unixSecondsEntry}>
                        {new Date(unixSecondsEntry * 1000).toLocaleString('en-GB', {
                          timeStyle: 'short',
                          timeZone: 'Europe/Berlin',
                        })}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {powerData.production_types?.map(productionType => (
                    <tr key={productionType.name}>
                      <th>{productionType.name}</th>
                      {productionType.data?.map(data => <td key={data}>{data}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  )
}
