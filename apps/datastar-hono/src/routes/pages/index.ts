import { sampleCountries } from '@project/energy-charts-service/countries'
import { publicPowerPublicPowerGet } from '@project/energy-charts-service/client'
import { calculateEnergyChartHueRotation } from '@project/helpers/chart'
import {
  formatCountryName,
  formatEnergyChartDataPoint,
  formatEnergyChartDataPointDate,
} from '@project/helpers/formatters'
import { readSearchJsonSearchJsonGet } from '@project/open-library-service/client'
import { getCountries, getPhotoStationByCountry } from '@project/railway-station-service/client'
import { toStationPhotos } from '@project/railway-station-service/transforms'
import { Hono } from 'hono'
import { escapeHtml, renderLayout } from '../../lib/html'

const pageRoutes = new Hono()

type EnergyCountry = NonNullable<(typeof sampleCountries)[number]>
const energyChartCountries = sampleCountries.filter((country): country is EnergyCountry => country != null)

pageRoutes.get('/', (context) => context.redirect('/stationCountries'))

pageRoutes.get('/stationCountries', async (context) => {
  const selectedCountry = context.req.query('country')
  const countries = await getCountries().catch(() => [])

  const countryOptions = countries
    .map(
      (country) =>
        `<option value="${country.code}" ${selectedCountry === country.code ? 'selected' : ''}>${escapeHtml(country.name)}</option>`,
    )
    .join('')

  return context.html(
    renderLayout({
      title: 'Railway Station Countries',
      body: `<section class="space-y-4">
  <h1 class="text-2xl font-bold">Countries with apps</h1>
  <form method="get" class="card bg-base-200 card-body w-fit">
    <label class="label" for="country"><span class="label-text">Selected country</span></label>
    <select class="select select-bordered" id="country" name="country" onchange="this.form.submit()">
      <option value="">None</option>
      ${countryOptions}
    </select>
  </form>
  <pre class="bg-base-200 rounded-box p-4 overflow-x-auto">${escapeHtml(JSON.stringify(countries, null, 2))}</pre>
  ${selectedCountry ? `<a class="btn btn-primary" href="/stationCountries/${selectedCountry}">Open station photos</a>` : ''}
</section>`,
    }),
  )
})

pageRoutes.get('/stationCountries/:country', async (context) => {
  const country = context.req.param('country')
  const photos = await getPhotoStationByCountry({ path: { country } })
    .then((result) => toStationPhotos(result))
    .catch(() => ({ stationsCount: 0, photographers: [], photos: [], photoBaseUrl: '' }))

  return context.html(
    renderLayout({
      title: `Station Photos for ${country}`,
      body: `<article class="prose max-w-none">
  <h1>Station Photos for <em>${escapeHtml(country)}</em></h1>
  <p>Station count: ${photos.stationsCount}</p>
  <h2>Photographers</h2>
  <div class="not-prose grid gap-3 md:grid-cols-2 xl:grid-cols-3">
    ${photos.photographers
      .map(
        (photographer) => `<div class="card bg-base-200 shadow-sm"><div class="card-body"><h3 class="card-title">${escapeHtml(photographer.name)}</h3>${photographer.url ? `<a class="link" href="${photographer.url}" target="_blank" rel="noreferrer">${escapeHtml(photographer.url)} ↗️</a>` : ''}</div></div>`,
      )
      .join('')}
  </div>
  <h2>Station photos</h2>
  <div class="not-prose grid gap-3 md:grid-cols-2">
    ${photos.photos
      .map(
        (photo) => `<figure class="card bg-base-200 overflow-hidden"><img loading="lazy" class="aspect-video w-full object-cover" src="${photos.photoBaseUrl + photo.path}" alt="A railway station in ${country.toUpperCase()} by ${escapeHtml(photo.photographer)}" /><figcaption class="px-3 py-2 text-sm">by ${escapeHtml(photo.photographer)} at ${new Date(photo.createdAt).toLocaleDateString('en-GB')}</figcaption></figure>`,
      )
      .join('')}
  </div>
</article>`,
    }),
  )
})

pageRoutes.get('/openLibrary', async (context) => {
  const q = context.req.query('q') ?? ''
  const page = Number(context.req.query('page') ?? '1')
  const results = await readSearchJsonSearchJsonGet({ query: { q, page } }).catch((error) => ({ error: String(error) }))

  return context.html(
    renderLayout({
      title: 'Open Library',
      body: `<section class="space-y-4">
  <form class="space-y-2" method="get" action="/openLibrary">
    <label class="input input-bordered flex items-center gap-2">
      <span role="img" aria-label="Search">🔍</span>
      <input type="search" name="q" value="${escapeHtml(q)}" class="grow" />
      <kbd class="kbd kbd-sm">Enter</kbd>
    </label>
    <input type="hidden" name="page" value="1" />
  </form>
  <nav><ul class="menu menu-horizontal bg-base-300 rounded-box">
    ${[1, 2, 3].map((entry) => `<li><a class="${page === entry ? 'menu-active' : ''}" href="/openLibrary?q=${encodeURIComponent(q)}&page=${entry}">page ${entry}</a></li>`).join('')}
  </ul></nav>
  <pre class="bg-base-200 rounded-box p-4 overflow-x-auto">${escapeHtml(JSON.stringify(results, null, 2))}</pre>
</section>`,
    }),
  )
})

pageRoutes.get('/energyCharts', (context) => {
  const links = energyChartCountries
    .map((country) => `<li><a href="/energyCharts/${country}">${escapeHtml(formatCountryName(country) ?? country)}</a></li>`)
    .join('')

  return context.html(
    renderLayout({
      title: 'Energy Charts',
      body: `<section class="space-y-4"><h1 class="text-2xl font-bold">Energy Production per Region in Megawatts(MW)</h1><ul class="menu menu-horizontal bg-base-200 rounded-box"><li class="menu-title">Select country</li>${links}</ul></section>`,
    }),
  )
})

pageRoutes.get('/energyCharts/:country', async (context) => {
  const country = context.req.param('country')
  const powerData = await publicPowerPublicPowerGet({ query: { country } }).catch(() => ({ unix_seconds: [], production_types: [] }))

  const headCells = (powerData.unix_seconds ?? [])
    .map((entry) => `<td class="text-right">${formatEnergyChartDataPointDate(entry)}</td>`)
    .join('')

  const rows = (powerData.production_types ?? [])
    .map((productionType) => {
      const cells = productionType.data
        .map((data) => {
          const hue = data ? calculateEnergyChartHueRotation({ value: data }) : 0
          return `<td style="filter:hue-rotate(${hue}deg)" class="bg-blue-600 text-right text-white">${data ? formatEnergyChartDataPoint(data) : 'no data'}</td>`
        })
        .join('')

      return `<tr><th>${escapeHtml(productionType.name)}</th>${cells}</tr>`
    })
    .join('')

  return context.html(
    renderLayout({
      title: `Energy Charts ${country}`,
      body: `<section class="space-y-4"><h1 class="text-2xl font-bold">Energy Production per Region in Megawatts(MW)</h1><ul class="menu menu-horizontal bg-base-200 rounded-box"><li class="menu-title">Selected country</li>${energyChartCountries.map((entry) => `<li><a class="${entry === country ? 'menu-active' : ''}" href="/energyCharts/${entry}">${escapeHtml(formatCountryName(entry) ?? entry)}</a></li>`).join('')}</ul><div class="overflow-x-auto"><table class="table table-xs table-pin-cols tabular-nums"><thead><tr><th>Production Type</th>${headCells}</tr></thead><tbody>${rows}</tbody></table></div></section>`,
    }),
  )
})

export { pageRoutes }
