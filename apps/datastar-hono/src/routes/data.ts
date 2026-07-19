import { publicPowerPublicPowerGet } from '@project/energy-charts-service/client'
import { sampleCountries } from '@project/energy-charts-service/countries'
import { readSearchJsonSearchJsonGet } from '@project/open-library-service/client'
import { getPhotoStationByCountry } from '@project/railway-station-service/client'
import { toStationPhotos } from '@project/railway-station-service/transforms'
import { ServerSentEventGenerator } from '@starfederation/datastar-sdk/web'
import { Hono } from 'hono'
import { energyPowerView, errorRegion, openLibraryResultsView, stationDetailsView } from '../views'

const dataRoutes = new Hono()

function patchRegion(
  request: Request,
  id: string,
  render: (signal: AbortSignal) => Promise<unknown>,
) {
  const controller = new AbortController()
  const signal = AbortSignal.any([request.signal, controller.signal, AbortSignal.timeout(10_000)])

  if (!request.headers.has('datastar-request')) {
    return render(signal)
      .then(
        (content) => new Response(String(content), { headers: { 'content-type': 'text/html' } }),
      )
      .catch((error) => {
        console.error(error)
        return new Response(String(errorRegion(id)), {
          status: 502,
          headers: { 'content-type': 'text/html' },
        })
      })
  }

  return ServerSentEventGenerator.stream(
    async (stream) => {
      try {
        const content = await render(signal)
        if (!signal.aborted) stream.patchElements(String(content))
      } catch (error) {
        if (signal.aborted) return
        console.error(error)
        stream.patchElements(String(errorRegion(id)))
      }
    },
    { onAbort: () => controller.abort() },
  )
}

async function fetchRailwayPhotos(input: string | URL | Request, init?: RequestInit) {
  const response = await fetch(input, init)
  if (!response.ok) return response

  const body = await response.json()
  // ponytail: the live API returns null although its OpenAPI schema declares this field optional.
  for (const photographer of body.photographers ?? []) {
    if (photographer.url === null) delete photographer.url
  }
  return Response.json(body, { status: response.status })
}

dataRoutes.get('/stationCountries/stationPhotos/:country', (context) => {
  const country = context.req.param('country')
  return patchRegion(context.req.raw, 'station-details', async (signal) => {
    if (!/^[a-z]{2}$/i.test(country)) throw new Error('Invalid railway country code')
    const response = await getPhotoStationByCountry({
      path: { country },
      fetch: fetchRailwayPhotos,
      signal,
    })
    return stationDetailsView(country, toStationPhotos(response))
  })
})

dataRoutes.get('/openLibrary/search', (context) => {
  const q = context.req.query('q') ?? ''
  const rawPage = context.req.query('page')
  const parsedPage = rawPage && /^\d+$/.test(rawPage) ? Number(rawPage) : 1
  const page = Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1

  return patchRegion(context.req.raw, 'open-library-results', async (signal) => {
    const results = await readSearchJsonSearchJsonGet({ query: { q, page }, signal })
    return openLibraryResultsView(results)
  })
})

dataRoutes.get('/energyCharts/power', (context) => {
  const country = context.req.query('country')
  return patchRegion(context.req.raw, 'energy-power-data', async (signal) => {
    if (!country || !sampleCountries.includes(country as (typeof sampleCountries)[number])) {
      throw new Error('Invalid energy country code')
    }
    const powerData = await publicPowerPublicPowerGet({ query: { country }, signal })
    return energyPowerView(powerData)
  })
})

export { dataRoutes }
