import { apiClient } from '@project/open-library-service/client'
import { createServerFn } from '@tanstack/start'
import { z } from 'vinxi'

export const query = z.object({
  q: z.string().optional().default(''),
  page: z.coerce.number().nonnegative().optional().default(1),
})

export const searchServerFn = createServerFn({ method: 'GET' })
  .validator(query.parse)
  .handler(async ({ data }) => await apiClient.read_search_json_search_json_get({
    queries: {
      q: data.q,
      page: data.page,
    },
  }),
  )
