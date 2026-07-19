import { sampleCountries } from '@project/energy-charts-service/countries'
import { getCountries } from '@project/railway-station-service/client'
import { Hono } from 'hono'
import {
  documentView,
  energyChartsView,
  loadingRegion,
  openLibraryView,
  stationCountriesView,
  stationCountrySelector,
} from '../views'

const pageRoutes = new Hono()

pageRoutes.get('/', async (context) => context.html(await documentView('/', 'Datastar Hono', '')))

pageRoutes.get('/stationCountries', async (context) => {
  const countries = await getCountries()
  return context.html(
    await documentView(
      context.req.path,
      'Railway Station Countries',
      stationCountriesView(countries),
    ),
  )
})

pageRoutes.get('/stationCountries/:country', async (context) => {
  const countries = await getCountries()
  const country = context.req.param('country')
  if (!countries.some((entry) => entry.code === country)) return context.notFound()

  return context.html(
    await documentView(context.req.path, `Station Photos for ${country}`, [
      stationCountrySelector(countries, country),
      loadingRegion(
        'station-details',
        `/api/stationCountries/stationPhotos/${encodeURIComponent(country)}`,
      ),
    ]),
  )
})

pageRoutes.get('/openLibrary', async (context) => {
  const url = new URL(context.req.url)
  const q = url.searchParams.get('q') ?? ''
  const rawPage = url.searchParams.get('page')
  const parsedPage = rawPage && /^\d+$/.test(rawPage) ? Number(rawPage) : 1
  const page = Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1
  const canonicalParams = new URLSearchParams()
  if (q) canonicalParams.set('q', q)
  if (page !== 1) canonicalParams.set('page', String(page))
  const query = canonicalParams.toString()
  const canonicalUrl = `/openLibrary${query ? `?${query}` : ''}`

  if (`${url.pathname}${url.search}` !== canonicalUrl) return context.redirect(canonicalUrl)

  return context.html(
    await documentView(context.req.path, 'Open Library', openLibraryView(q, page)),
  )
})

pageRoutes.get('/energyCharts', async (context) =>
  context.html(await documentView(context.req.path, 'Energy Charts', energyChartsView())),
)

pageRoutes.get('/energyCharts/:country', async (context) => {
  const country = context.req.param('country')
  if (!sampleCountries.includes(country as (typeof sampleCountries)[number])) {
    return context.notFound()
  }

  return context.html(
    await documentView(
      context.req.path,
      `Energy Charts for ${country.toUpperCase()}`,
      energyChartsView(country),
    ),
  )
})

export { pageRoutes }
