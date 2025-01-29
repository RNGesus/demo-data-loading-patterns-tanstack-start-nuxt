import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_shell')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <>
      <header className="navbar bg-base-200 ">
        <div className="flex-1">
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
        </div>
      </header>
      <Outlet />
    </>
  )
}
