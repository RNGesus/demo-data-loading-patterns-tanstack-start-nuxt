import { PageHeading } from '@app/components/PageHeading'
import { sampleCountries } from '@project/energy-charts-service/countries'
import {
  calculateEnergyChartHueRotation,
  ENERGY_CHART_HUE_ROTATION_MAX,
  ENERGY_CHART_HUE_ROTATION_MIN,
} from '@project/helpers/chart'

import { formatCountryName, formatEnergyChartDataPoint } from '@project/helpers/formatters'
import {
  createFileRoute,
  Link,
  Outlet,
} from '@tanstack/react-router'

export const Route = createFileRoute('/_shell/_energyChartsHeader')({
  component: RouteComponent,
})

const countries = sampleCountries.map(country => ({
  code: country,
  name: formatCountryName(country),
}))

function ColorScale({ steps = 9, minValue = ENERGY_CHART_HUE_ROTATION_MIN, maxValue = ENERGY_CHART_HUE_ROTATION_MAX }) {
  const values = Array.from({ length: steps }, (_, i) => {
    return minValue + (maxValue - minValue) * (i / (steps - 1))
  })
  const ariaLabel = `Color scale from ${minValue} to ${maxValue} MegaWatts (MW)`

  return (
    <div
      role="img"
      className="w-full h-12 grid grid-flow-col auto-cols-fr rounded-box overflow-hidden tabular-nums slashed-zero text-xs"
      aria-label={ariaLabel}
    >
      {values.map((value, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{
            ['--color-grade' as string]: `${calculateEnergyChartHueRotation({ value })}deg`,
          }}
          className="bg-blue-600 hue-rotate-[var(--color-grade)] grid place-items-center"
        >
          {formatEnergyChartDataPoint(Math.round(value))}
        </div>
      ))}
    </div>
  )
}

function CountrySelector() {
  return (
    <header>
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
    </header>
  )
}

function RouteComponent() {
  return (
    <>
      <PageHeading>Energy Production per Region in Megawatts(MW)</PageHeading>

      <CountrySelector />
      <ColorScale />
      <Outlet />
    </>
  )
}
