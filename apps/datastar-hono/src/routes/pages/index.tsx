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
import { Layout } from '../../components/Layout'

const pageRoutes = new Hono()

type EnergyCountry = NonNullable<(typeof sampleCountries)[number]>
const energyChartCountries = sampleCountries.filter(
  (country): country is EnergyCountry => country != null,
)

pageRoutes.get('/', (context) => context.redirect('/stationCountries'))

pageRoutes.get('/stationCountries', async (context) => {
  const selectedCountry = context.req.query('country')
  const countries = await getCountries().catch(() => [])

  return context.html(
    <Layout title="Railway Station Countries">
      <section class="space-y-4">
        <h1 class="text-2xl font-bold">Countries with apps</h1>
        <form method="get" class="card bg-base-200 card-body w-fit">
          <label class="label" htmlFor="country">
            <span class="label-text">Selected country</span>
          </label>
          <select class="select select-bordered" id="country" name="country" onchange="this.form.submit()">
            <option value="">None</option>
            {countries.map((country) => (
              <option value={country.code} selected={selectedCountry === country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </form>
        <pre class="bg-base-200 rounded-box p-4 overflow-x-auto">{JSON.stringify(countries, null, 2)}</pre>
        {selectedCountry ? (
          <a class="btn btn-primary" href={`/stationCountries/${selectedCountry}`}>
            Open station photos
          </a>
        ) : null}
      </section>
    </Layout>,
  )
})

pageRoutes.get('/stationCountries/:country', async (context) => {
  const country = context.req.param('country')
  const photos = await getPhotoStationByCountry({ path: { country } })
    .then((result) => toStationPhotos(result))
    .catch(() => ({ stationsCount: 0, photographers: [], photos: [], photoBaseUrl: '' }))

  return context.html(
    <Layout title={`Station Photos for ${country}`}>
      <article class="prose max-w-none">
        <h1>
          Station Photos for <em>{country}</em>
        </h1>
        <p>Station count: {photos.stationsCount}</p>

        <h2>Photographers</h2>
        <div class="not-prose grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {photos.photographers.map((photographer) => (
            <div class="card bg-base-200 shadow-sm">
              <div class="card-body">
                <h3 class="card-title">{photographer.name}</h3>
                {photographer.url ? (
                  <a class="link" href={photographer.url} target="_blank" rel="noreferrer">
                    {photographer.url} ↗️
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <h2>Station photos</h2>
        <div class="not-prose grid gap-3 md:grid-cols-2">
          {photos.photos.map((photo) => (
            <figure class="card bg-base-200 overflow-hidden">
              <img
                loading="lazy"
                class="aspect-video w-full object-cover"
                src={photos.photoBaseUrl + photo.path}
                alt={`A railway station in ${country.toUpperCase()} by ${photo.photographer}`}
              />
              <figcaption class="px-3 py-2 text-sm">
                by {photo.photographer} at {new Date(photo.createdAt).toLocaleDateString('en-GB')}
              </figcaption>
            </figure>
          ))}
        </div>
      </article>
    </Layout>,
  )
})

pageRoutes.get('/openLibrary', async (context) => {
  const q = context.req.query('q') ?? ''
  const page = Number(context.req.query('page') ?? '1')
  const initialResults = await readSearchJsonSearchJsonGet({ query: { q, page } }).catch((error) => ({
    error: String(error),
  }))
  const initialSignals = JSON.stringify({
    q,
    page,
    openLibraryError: '',
    openLibraryResults: JSON.stringify(initialResults, null, 2),
  })

  return context.html(
    <Layout title="Open Library">
      <section class="space-y-4" data-signals={initialSignals}>
        <div class="alert alert-info">
          <span>Powered by Datastar signals + Hono API patch responses.</span>
        </div>
        <form id="open-library-search" class="space-y-2" data-on-submit="@post('/api/openLibrary/search')">
          <label class="input input-bordered flex items-center gap-2">
            <span role="img" aria-label="Search">
              🔍
            </span>
            <input type="search" name="q" data-bind-q class="grow" />
            <kbd class="kbd kbd-sm">Enter</kbd>
          </label>
          <div class="flex gap-2 items-center">
            {[1, 2, 3].map((entry) => (
              <button
                class="btn btn-sm"
                type="button"
                data-on-click={`$page = ${entry}; @post('/api/openLibrary/search')`}
              >
                page {entry}
              </button>
            ))}
                      </div>
          <input type="hidden" name="page" data-bind-page />
          <p class="text-error" data-text="$openLibraryError"></p>
        </form>
        <pre class="bg-base-200 rounded-box p-4 overflow-x-auto" data-text="$openLibraryResults"></pre>
      </section>
    </Layout>,
  )
})

pageRoutes.get('/energyCharts', (context) => {
  return context.html(
    <Layout title="Energy Charts">
      <section class="space-y-4">
        <h1 class="text-2xl font-bold">Energy Production per Region in Megawatts(MW)</h1>
        <ul class="menu menu-horizontal bg-base-200 rounded-box">
          <li class="menu-title">Select country</li>
          {energyChartCountries.map((country) => (
            <li>
              <a href={`/energyCharts/${country}`}>{formatCountryName(country) ?? country}</a>
            </li>
          ))}
        </ul>
      </section>
    </Layout>,
  )
})

pageRoutes.get('/energyCharts/:country', async (context) => {
  const country = context.req.param('country')
  const powerData = await publicPowerPublicPowerGet({ query: { country } }).catch(() => ({
    unix_seconds: [],
    production_types: [],
  }))

  return context.html(
    <Layout title={`Energy Charts ${country}`}>
      <section class="space-y-4">
        <h1 class="text-2xl font-bold">Energy Production per Region in Megawatts(MW)</h1>
        <ul class="menu menu-horizontal bg-base-200 rounded-box">
          <li class="menu-title">Selected country</li>
          {energyChartCountries.map((entry) => (
            <li>
              <a class={entry === country ? 'menu-active' : ''} href={`/energyCharts/${entry}`}>
                {formatCountryName(entry) ?? entry}
              </a>
            </li>
          ))}
        </ul>
        <div class="overflow-x-auto">
          <table class="table table-xs table-pin-cols tabular-nums">
            <thead>
              <tr>
                <th>Production Type</th>
                {(powerData.unix_seconds ?? []).map((entry) => (
                  <td class="text-right">{formatEnergyChartDataPointDate(entry)}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {(powerData.production_types ?? []).map((productionType) => (
                <tr>
                  <th>{productionType.name}</th>
                  {productionType.data.map((data) => {
                    const hue = data ? calculateEnergyChartHueRotation({ value: data }) : 0
                    return (
                      <td
                        style={`filter:hue-rotate(${hue}deg)`}
                        class="bg-blue-600 text-right text-white"
                      >
                        {data ? formatEnergyChartDataPoint(data) : 'no data'}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>,
  )
})

export { pageRoutes }
