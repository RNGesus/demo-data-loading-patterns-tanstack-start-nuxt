export function formatEnergyChartDataPoint(number: number) {
  return new Intl.NumberFormat(
    'de-DE',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  ).format(number)
}

export function formatEnergyChartDataPointDate(unixSeconds: number) {
  return new Date(unixSeconds * 1000).toLocaleString(
    'de-DE',
    {
      timeStyle: 'short',
      timeZone: 'Europe/Berlin',
    },
  )
}
