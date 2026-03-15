import { publicPowerPublicPowerGet } from '@project/energy-charts-service/client'
import * as z from 'zod'

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, z.object({ country: z.string() }).parse)

  return await publicPowerPublicPowerGet({
    query: { country: query.country },
  })
})
