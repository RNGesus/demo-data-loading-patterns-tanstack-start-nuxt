import { powerServerFn } from '@app/integrations/energyCharts/power.serverFn'
import { calculateEnergyChartHueRotation } from '@project/helpers/chart'
import {
  formatEnergyChartDataPoint,
  formatEnergyChartDataPointDate,
} from '@project/helpers/formatters'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense, use } from 'react'

export const Route = createFileRoute(
  '/_shell/_energyChartsHeader/energyCharts/$country',
)({
  component: RouteComponent,
  loader: async ({ params }) => ({
    promisedPowerData: powerServerFn({ data: { country: params.country } }),
  }),
})

function RouteComponent() {
  const { promisedPowerData } = Route.useLoaderData()
  const powerData = use(promisedPowerData)

  return (
    <Suspense fallback={<div>Loading power data...</div>}>
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-cols tabular-nums">
          <thead>
            <tr>
              <th>Production Type</th>
              {powerData.unix_seconds?.map(unixSecondsEntry => (
                <td className="text-right" key={unixSecondsEntry}>
                  {formatEnergyChartDataPointDate(unixSecondsEntry)}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {powerData.production_types?.map(productionType => (
              <tr key={productionType.name}>
                <th className="z-1">{productionType.name}</th>
                {productionType.data?.map((data, index) => (
                  <td
                    // eslint-disable-next-line react/no-array-index-key -- there is nothing else to use as a key
                    key={index}
                    style={{
                      ['--color-grade' as string]: `${data ? calculateEnergyChartHueRotation({ value: data }) : 0}deg`,
                    }}
                    className={`text-right bg-blue-600 hue-rotate-(--color-grade) ${!data ? 'grayscale-60' : ''}`}
                  >
                    {data ? formatEnergyChartDataPoint(data) : 'no data'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Suspense>
  )
}
