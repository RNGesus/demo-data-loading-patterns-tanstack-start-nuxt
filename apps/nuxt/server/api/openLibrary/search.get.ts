import type { H3Event } from 'nitro/h3'
import { readSearchJsonSearchJsonGet } from '@project/open-library-service/client'
import * as z from 'zod'

export default defineEventHandler(async (event: H3Event) => {
  const query = await getValidatedQuery(
    event,
    z.object({
      q: z.string().optional().default(''),
      page: z.coerce.number().optional().default(1),
    }).parse,
  )
  return await readSearchJsonSearchJsonGet({
    query: { page: query.page, q: query.q },
  })
})
