import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_shell/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
