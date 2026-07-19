import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import app from './app'

const countries = [
  {
    code: 'de',
    name: 'Germany <unsafe>',
    timetableUrlTemplate: 'https://trains.example/{id}',
    active: true,
    allowPhotoUploads: true,
    providerApps: [
      { type: 'web', name: 'Rail app', url: 'https://rail.example' },
      { type: 'ios', name: 'Unsafe app', url: 'javascript:alert(1)' },
    ],
  },
]

const stationPhotos = {
  photoBaseUrl: 'https://images.example/photos',
  licenses: [],
  photographers: [{ name: 'Alex <script>', url: null }],
  stations: [
    {
      country: 'de',
      id: 'one',
      title: 'Central',
      lat: 1,
      lon: 2,
      photos: [
        {
          id: 1,
          photographer: 'Alex <script>',
          path: '/ee/station.jpg',
          createdAt: 0,
          license: 'CC0',
        },
      ],
    },
  ],
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

function datastarRequest(path: string, init?: RequestInit) {
  const headers = new Headers(init?.headers)
  headers.set('datastar-request', 'true')
  return app.request(path, { ...init, headers })
}

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: string | URL | Request) => {
      const url = new URL(input instanceof Request ? input.url : input)
      if (url.hostname === 'api.railway-stations.org' && url.pathname === '/countries') {
        return json(countries)
      }
      if (url.hostname === 'api.railway-stations.org') return json(stationPhotos)
      if (url.hostname === 'openlibrary.org') {
        return url.searchParams.get('q') === 'fail'
          ? json({ error: 'upstream' }, 500)
          : json({ docs: [{ title: '<unsafe book>' }] })
      }
      if (url.hostname === 'api.energy-charts.info') {
        return json({
          unix_seconds: [0, 3600],
          production_types: [{ name: 'Solar <unsafe>', data: [1234.5, 0] }],
          deprecated: false,
        })
      }
      throw new Error(`Unexpected request: ${url}`)
    }),
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('Datastar Hono app', () => {
  it('renders all public routes with server navigation and deferred regions', async () => {
    const routes = [
      '/',
      '/stationCountries',
      '/stationCountries/de',
      '/openLibrary',
      '/energyCharts',
      '/energyCharts/de',
    ]
    const responses = await Promise.all(
      routes.map(async (route) => {
        const response = await app.request(route)
        return { route, status: response.status, body: await response.text() }
      }),
    )
    for (const { route, status, body } of responses) {
      expect(status, route).toBe(200)
      expect(body, route).toContain('Railway Station Countries ➡️')
      expect(body, route).toContain(
        'integrity="sha384-SnyFlWTdFL3c8+9/1WsPuMFBq6AQOGC1LmS9upY4YkM3En3wZr5q2UvydHaMgOVG"',
      )
    }

    const stations = await (await app.request('/stationCountries')).text()
    expect(stations).toContain('Countries with apps')
    expect(stations).toContain('Germany &lt;unsafe&gt;')
    expect(stations).toContain('aria-current="page"')
    expect(stations).not.toContain('href="javascript:')

    const detail = await (await app.request('/stationCountries/de')).text()
    expect(detail).toContain('data-init="@get(\'/api/stationCountries/stationPhotos/de\')"')
    expect(detail).toContain('data-indicator:results-loading')
    expect(detail).toContain('Load data without JavaScript')
    expect(detail).toContain('<strong>de</strong>')

    const energy = await (await app.request('/energyCharts/de')).text()
    expect(energy).toContain('Energy Production per Region in Megawatts(MW)')
    expect(energy.match(/href="\/energyCharts\//g)).toHaveLength(10)
    expect(energy).toContain('Color scale from -10000 to 70000')
  })

  it('canonicalizes Open Library URLs and renders exactly three page links', async () => {
    const redirect = await app.request('/openLibrary?q=&page=not-a-page&ignored=yes')
    expect(redirect.status).toBe(302)
    expect(redirect.headers.get('location')).toBe('/openLibrary')

    const response = await app.request('/openLibrary?q=rail&page=2')
    const body = await response.text()
    expect(body.match(/page [123]/g)).toHaveLength(3)
    expect(body).toContain('href="/openLibrary?q=rail"')
    expect(body).toContain('href="/openLibrary?q=rail&amp;page=2"')
    expect(body).toContain('value="rail"')
  })

  it('patches escaped station, search, and energy results with current Datastar events', async () => {
    const stationResponse = await datastarRequest('/api/stationCountries/stationPhotos/de')
    const stationBody = await stationResponse.text()
    expect(stationBody).toContain('event: datastar-patch-elements')
    expect(stationBody).toContain('Station count: 1')
    expect(stationBody).toContain('Alex &lt;script&gt;')
    expect(stationBody).toContain('src="https://images.example/photos/ee/station.jpg"')
    expect(stationBody).not.toContain('data-init')

    const searchResponse = await datastarRequest('/api/openLibrary/search?q=rail&page=2')
    const searchBody = await searchResponse.text()
    expect(searchBody).toContain('event: datastar-patch-elements')
    expect(searchBody).toContain('&lt;unsafe book&gt;')
    expect(searchResponse.headers.get('content-length')).toBeNull()

    const energyResponse = await datastarRequest('/api/energyCharts/power?country=de')
    const energyBody = await energyResponse.text()
    expect(energyBody).toContain('event: datastar-patch-elements')
    expect(energyBody).toContain('1.234,50')
    expect(energyBody).toContain('no data')
    expect(energyBody).toContain('Solar &lt;unsafe&gt;')
    expect(energyResponse.headers.get('content-length')).toBeNull()
  })

  it('serves progressive HTML fallbacks without a Datastar request', async () => {
    const response = await app.request('/api/stationCountries/stationPhotos/de')
    const body = await response.text()
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('text/html')
    expect(body).toContain('Station count: 1')
    expect(body).not.toContain('event: datastar-patch-elements')
  })

  it('propagates stream cancellation to upstream fetches', async () => {
    let upstreamSignal: AbortSignal | undefined
    vi.mocked(fetch).mockImplementationOnce(
      (input) =>
        new Promise(() => {
          upstreamSignal = input instanceof Request ? input.signal : undefined
        }),
    )

    const response = await datastarRequest('/api/stationCountries/stationPhotos/de')
    await vi.waitFor(() => expect(upstreamSignal).toBeDefined())
    await response.body?.cancel()
    expect(upstreamSignal?.aborted).toBe(true)
  })

  it('handles invalid routes and upstream failures without leaking details', async () => {
    expect((await app.request('/energyCharts/nope')).status).toBe(404)
    expect((await app.request('/stationCountries/nope')).status).toBe(404)

    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const response = await datastarRequest('/api/openLibrary/search?q=fail')
    const body = await response.text()
    expect(response.status).toBe(200)
    expect(body).toContain('role="alert"')
    expect(body).toContain('Unable to load data.')
    expect(body).not.toContain('upstream')
  })
})
