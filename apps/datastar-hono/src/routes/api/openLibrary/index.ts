import type { Jsonifiable } from '@starfederation/datastar-sdk/types'
import { ServerSentEventGenerator } from '@starfederation/datastar-sdk/web'
import { readSearchJsonSearchJsonGet } from '@project/open-library-service/client'
import { Hono } from 'hono'
import { disableSSG } from 'hono/ssg'

type SignalPatch = Record<string, Jsonifiable>

const sseHeaders = {
  'cache-control': 'no-cache',
  connection: 'keep-alive',
  'content-type': 'text/event-stream',
}

const openLibraryApi = new Hono()
openLibraryApi.use('*', disableSSG())

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

openLibraryApi.post('/search', async (context) => {
  const parsedSignals = await ServerSentEventGenerator.readSignals(context.req.raw)

  if (!parsedSignals.success) {
    return datastarSignalResponse(
      {
        openLibraryError: 'Expected a Datastar signal payload.',
      },
      400,
    )
  }

  const q = typeof parsedSignals.signals.q === 'string' ? parsedSignals.signals.q : ''
  const page = Number(parsedSignals.signals.page ?? 1)

  if (!Number.isInteger(page) || page < 1) {
    return datastarSignalResponse(
      {
        openLibraryError: 'Page must be a whole number greater than 0.',
      },
      422,
    )
  }

  try {
    const results = await readSearchJsonSearchJsonGet({ query: { q, page } })

    return datastarSignalResponse({
      q,
      page,
      openLibraryError: '',
      openLibraryResults: JSON.stringify(results, null, 2),
    })
  } catch (error) {
    return datastarSignalResponse(
      {
          openLibraryError: String(error),
      },
      502,
    )
  }
})

function datastarSignalResponse(signals: SignalPatch, status = 200) {
  return new Response(datastarMergeSignalsEvent(signals), {
    status,
    headers: sseHeaders,
  })
}

function datastarMergeSignalsEvent(signals: SignalPatch) {
  return `event: datastar-merge-signals\ndata: signals ${JSON.stringify(signals)}\n\n`
}

export { openLibraryApi }
