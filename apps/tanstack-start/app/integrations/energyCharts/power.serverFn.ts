import { apiClient } from '@project/energy-charts-service/client'
import { createServerFn } from '@tanstack/react-start'
import { query } from './power.querySchema'

export const powerServerFn = createServerFn({ method: 'GET' })
  .validator(query.parse)
  .handler(async ({ data }) => {
    return apiClient.public_power_public_power_get({ queries: { country: data.country }, timeout: 1000 * 10 }).catch((error) => {
      console.error('🧨🧨🧨', error.status, error.message, '🧨🧨🧨')
      throw new Error(error.message)
    })
  })
