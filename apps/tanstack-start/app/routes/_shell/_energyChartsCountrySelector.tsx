import { sampleCountries } from '@project/energy-charts-service/countries'
import { formatCountryName } from '@project/helpers/formatters'

import {
  createFileRoute,
  Link,
  Outlet,
} from '@tanstack/react-router'

export const Route = createFileRoute('/_shell/_energyChartsCountrySelector')({
  component: RouteComponent,
})

const countries = sampleCountries.map(country => ({
  code: country,
  name: formatCountryName(country),
}))

function CountrySelector() {
  return (
    <ul className="menu menu-horizontal bg-base-200 my-2">
      <li className="menu-title">
        Selected country:
      </li>
      {countries.map(countryEntry => (
        <li key={countryEntry.code}>
          <Link
            activeProps={{ className: 'menu-active' }}
            to="/energyCharts/$country"
            params={{ country: countryEntry.code }}
          >
            {countryEntry.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function RouteComponent() {
  return (
    <>
      <CountrySelector />
      <Outlet />
    </>
  )
}
