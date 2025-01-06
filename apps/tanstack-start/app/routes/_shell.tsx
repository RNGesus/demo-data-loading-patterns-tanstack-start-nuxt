import { countriesServerFn } from '@app/countries/countries.serverFn'
import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
} from '@tanstack/react-router'

export const Route = createFileRoute('/_shell')({
  component: LayoutComponent,
  loader: async ({ params }) => {
    const countries = await countriesServerFn()
    const country = 'country' in params && typeof params.country === 'string' ? params.country : null

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
              to="/countries/$country"
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
          {/* start */}
          <ul className="menu menu-horizontal">
            <li>
              <Link to="/countries">Countries ↗️</Link>
            </li>
            <li>
              <Link to="/openLibrary">OpenLibrary ↗️</Link>
            </li>
          </ul>
        </div>
        <div className="flex-none">
          {/* end */}
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
