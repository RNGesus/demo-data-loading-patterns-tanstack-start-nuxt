const energyChartDataPointFormatter = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
export function formatEnergyChartDataPoint(number: number) {
  return energyChartDataPointFormatter.format(number)
}

const energyChartDataPointDateFormatter = new Intl.DateTimeFormat('de-DE', {
  timeStyle: 'short',
  timeZone: 'Europe/Berlin',
})
export function formatEnergyChartDataPointDate(unixSeconds: number) {
  return energyChartDataPointDateFormatter.format(new Date(unixSeconds * 1000))
}

const countryNameFormatter = new Intl.DisplayNames(['en-GB'], { type: 'region' })
export function formatCountryName(countryCode: string) {
  return countryNameFormatter.of(countryCode.toUpperCase())
}
