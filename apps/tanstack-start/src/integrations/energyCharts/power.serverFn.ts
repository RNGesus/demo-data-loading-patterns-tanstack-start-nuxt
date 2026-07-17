import { publicPowerPublicPowerGet } from '@project/energy-charts-service/client'
import { createServerFn } from '@tanstack/react-start'
import { query } from './power.querySchema'

export const powerServerFn = createServerFn({ method: 'GET' })
  .inputValidator(query)
  .handler(async ({ data }) => {
    return await publicPowerPublicPowerGet({
      query: { country: data.country },
      signal: AbortSignal.timeout(1000 * 10),
    }).catch((error) => {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : JSON.stringify(error)

      console.error('🧨🧨🧨', message, '🧨🧨🧨')
      throw new Error(message)
    })
  })
