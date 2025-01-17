import { stationCountriesServerFn } from '@app/railwayStations/stationCountries.serverFn'
import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
} from '@tanstack/react-router'
import { fallback } from '@tanstack/zod-adapter'
import { z } from 'zod'

const countryParamSchema = z.object({
  country: fallback(z.string(), '').default(''),
})

export const Route = createFileRoute('/_shell')({
  component: LayoutComponent,
  loader: async ({ params }) => {
    const countries = await stationCountriesServerFn()
    const parsedParams = countryParamSchema.safeParse(params)
    const country = parsedParams.success ? parsedParams.data.country : null

    if (country && countries.every(c => c.code !== country)) {
      throw notFound()
    }

    return countries
  },
})

function CountrySelector() {
  const countries = Route.useLoaderData()
  const params = Route.useParams()
  return (
    <details>
      <summary className="flex gap-2">
        Selected country:
        {'country' in params && typeof params.country === 'string' && <b>{params.country}</b>}
      </summary>
      <ul className="bg-base-200 rounded-t-none p-2 z-[1]">
        {countries.map(country => (
          <li key={country.code}>
            {/* FIXME: the active class is set but the DaisyUI styles are missing */}
            <Link
              to="/stationCountries/$country"
              params={{ country: country.code }}
            >
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  )
}

function LayoutComponent() {
  return (
    <>
      <header className="navbar bg-base-200 ">
        <div className="flex-1">
          <ul className="menu menu-horizontal">
            <li>
              <Link to="/stationCountries">Countries ↗️</Link>
            </li>
            <li>
              <Link to="/openLibrary">OpenLibrary ↗️</Link>
            </li>
          </ul>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <CountrySelector />
            </li>
          </ul>
        </div>
      </header>
      <Outlet />
    </>
  )
}
