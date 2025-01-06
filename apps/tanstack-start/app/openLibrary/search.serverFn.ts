import { apiClient } from '@project/open-library-service/client'
import { createServerFn } from '@tanstack/start'
import { query } from './search.querySchema'

export const searchServerFn = createServerFn({ method: 'GET' })
  .validator(query.parse)
  .handler(async ({ data }) => apiClient.read_search_json_search_json_get({
    queries: {
      q: data.q,
      page: data.page,
    },
  }))
