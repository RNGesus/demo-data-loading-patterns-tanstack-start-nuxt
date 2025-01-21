import { apiClient } from '@project/energy-charts-service/client'
import { z } from 'zod'

export default defineCachedEventHandler(async (event) => {
  const query = await getValidatedQuery(event, z.object({ country: z.string() }).parse)

  return await apiClient.public_power_public_power_get({
    queries: { country: query.country },
  })
})
