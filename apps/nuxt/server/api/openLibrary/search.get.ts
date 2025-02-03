import { apiClient } from '@project/open-library-service/client'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, z.object({
    q: z.string().optional().default(''),
    page: z.coerce.number().optional().default(1),
  }).parse)
  return await apiClient.read_search_json_search_json_get({ queries: { page: query.page, q: query.q } })
})
