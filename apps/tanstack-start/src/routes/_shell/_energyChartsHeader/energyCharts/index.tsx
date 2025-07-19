import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_shell/_energyChartsHeader/energyCharts/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <></>
  )
}
