import { readSearchJsonSearchJsonGet } from '@project/open-library-service/client'
import { createServerFn } from '@tanstack/react-start'
import { query } from './search.querySchema'

export const searchServerFn = createServerFn({ method: 'GET' })
  .inputValidator(query.parse)
  .handler(
    async ({ data }) =>
      (await readSearchJsonSearchJsonGet({
        query: {
          q: data.q,
          page: data.page,
        },
      })) as Record<string, {}>,
  )
