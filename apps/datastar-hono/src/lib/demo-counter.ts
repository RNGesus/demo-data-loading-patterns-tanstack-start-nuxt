let count = 0

export function getCounterCount() {
  return count
}

export function incrementCounterCount(step: number) {
  count += step
  return count
}
