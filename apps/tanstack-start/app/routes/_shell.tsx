import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_shell')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="p-4">
      <header className="navbar bg-base-200">
        <nav className="flex-1">
          <ul className="menu menu-horizontal">
            <li>
              <Link to="/stationCountries">Railway Station Countries ➡️</Link>
            </li>
            <li>
              <Link to="/openLibrary">OpenLibrary ➡️</Link>
            </li>
            <li>
              <Link to="/energyCharts">Energy Charts ➡️</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}
