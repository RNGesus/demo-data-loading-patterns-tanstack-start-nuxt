const ENERGY_CHART_HUE_ROTATION_MIN = -10000
const ENERGY_CHART_HUE_ROTATION_OFFSET = ENERGY_CHART_HUE_ROTATION_MIN < 0 ? Math.abs(ENERGY_CHART_HUE_ROTATION_MIN) : 0
const ENERGY_CHART_HUE_ROTATION_MAX = 70000
const ENERGY_CHART_HUE_ROTATION_MAX_WITH_OFFSET = ENERGY_CHART_HUE_ROTATION_MAX + ENERGY_CHART_HUE_ROTATION_OFFSET

function clampEnergyChartHueRotation(value: number) {
  if (value < ENERGY_CHART_HUE_ROTATION_MIN) {
    return ENERGY_CHART_HUE_ROTATION_MIN
  }
  if (value > ENERGY_CHART_HUE_ROTATION_MAX) {
    return ENERGY_CHART_HUE_ROTATION_MAX
  }
  return value
}

interface CalculateEnergyChartHueRotationProps {
  value: number
  maxRotation?: number
}
// TODO: use pure CSS instead
export function calculateEnergyChartHueRotation({
  value,
  maxRotation = 180,
}: CalculateEnergyChartHueRotationProps) {
  const clampedValue = clampEnergyChartHueRotation(value)
  const clampedValueWithOffset = clampedValue + ENERGY_CHART_HUE_ROTATION_OFFSET
  return Math.floor(clampedValueWithOffset / ENERGY_CHART_HUE_ROTATION_MAX_WITH_OFFSET * maxRotation)
}
