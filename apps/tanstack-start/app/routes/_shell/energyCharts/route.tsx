import { Dropdown } from '@app/components/Dropdown'
import { createFileRoute, Link, Outlet, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/_shell/energyCharts')({
  component: RouteComponent,
})

const countries = [
  { code: 'de', name: 'Germany' },
  { code: 'fr', name: 'France' },
  { code: 'es', name: 'Spain' },
  { code: 'pl', name: 'Poland' },
  { code: 'pt', name: 'Portugal' },
  { code: 'ro', name: 'Romania' },
] as const

function CountrySelector() {
  // TODO: find a better way to access the country param
  // const { country } = useParams({ from: '/_shell/energyCharts/$country' })
  const { country } = useParams({ strict: false })
  return (
    <Dropdown>
      <Dropdown.Trigger>
        Selected country:
        {country && <b>{country}</b>}
      </Dropdown.Trigger>
      <Dropdown.List>
        {countries.map(country => (
          <Dropdown.Item key={country.code}>
            <Link
              to="/energyCharts/$country"
              params={{ country: country.code }}
            >
              {country.name}
            </Link>
          </Dropdown.Item>
        ))}
      </Dropdown.List>
    </Dropdown>
  )
}

function RouteComponent() {
  return (
    <div className="prose max-w-full">
      <h1>Energy Charts Power Data</h1>
      <CountrySelector />
      <Outlet />
    </div>
  )
}
