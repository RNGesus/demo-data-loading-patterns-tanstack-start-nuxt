import { readSearchJsonSearchJsonGet } from '@project/open-library-service/client'
import { Hono } from 'hono'

const openLibraryApi = new Hono()

openLibraryApi.get('/search', async (context) => {
  const query = context.req.query()

  try {
    return context.json(
      await readSearchJsonSearchJsonGet({
        query: {
          q: query.q ?? '',
          page: Number(query.page ?? 1),
        },
      }),
    )
  } catch (error) {
    return context.json({ error: String(error) }, 502)
  }
})

export { openLibraryApi }
