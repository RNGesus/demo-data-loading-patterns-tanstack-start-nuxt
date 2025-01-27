export function formatEnergyChartDataPoint(number: number) {
  return new Intl.NumberFormat(
    'en-US',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  ).format(number)
}

export function formatEnergyChartDataPointDate(unixSeconds: number) {
  return new Date(unixSeconds * 1000).toLocaleString(
    'en-GB',
    {
      timeStyle: 'short',
      timeZone: 'Europe/Berlin',
    },
  )
}
