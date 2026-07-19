import type { ProductionModel } from '@project/energy-charts-service/types'
import type {
  Country,
  Photo,
  Photographer,
  ProviderApp,
} from '@project/railway-station-service/types'
import { sampleCountries } from '@project/energy-charts-service/countries'
import {
  calculateEnergyChartHueRotation,
  ENERGY_CHART_HUE_ROTATION_MAX,
  ENERGY_CHART_HUE_ROTATION_MIN,
} from '@project/helpers/chart'
import {
  formatCountryName,
  formatEnergyChartDataPoint,
  formatEnergyChartDataPointDate,
} from '@project/helpers/formatters'
import { html, raw } from 'hono/html'

const styles = `
:root{color-scheme:light;--bg:#fff;--surface:#f2f2f2;--text:#171717;--muted:#666;--border:#d5d5d5;--active:#dbeafe;--blue:#2563eb}*{box-sizing:border-box;min-width:0}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.5 system-ui,sans-serif}a{color:inherit}.page{padding:1rem;max-width:90rem;margin:auto}.navbar,.menu{display:flex;align-items:center;gap:.25rem;flex-wrap:wrap}.navbar{background:var(--surface);padding:.5rem}.menu{list-style:none;margin:0;padding:0}.menu a,.menu button,.button{display:block;padding:.65rem .8rem;border:0;border-radius:.35rem;background:transparent;font:inherit;text-decoration:none;cursor:pointer}.menu a:hover,.menu button:hover,.menu-active{background:var(--active)!important}.content{padding-top:1rem}h1{font-size:1.5rem}h2{margin-top:1.5rem}.cards,.photos,.photographers{display:grid;gap:.75rem}.cards{grid-template-columns:repeat(auto-fill,minmax(18rem,1fr));list-style:none;padding:0}.card{background:var(--surface);border-radius:.5rem;padding:1rem;box-shadow:0 1px 3px #0002}.card h2,.card h3{margin-top:0}.provider-list{padding-left:1.25rem}code{display:block;overflow-wrap:anywhere;user-select:all}button,input{font:inherit}.country-picker{margin-bottom:1rem}.country-list[popover]{inset:auto;width:13rem;max-height:min(500px,60vh);overflow:auto;border:1px solid var(--border);border-radius:.5rem;background:var(--bg);padding:.5rem}.country-list a{display:block;padding:.4rem;border-radius:.25rem;text-decoration:none}.country-list a:hover{background:var(--surface)}.photos{grid-template-columns:repeat(auto-fill,minmax(min(24rem,100%),1fr))}.photographers{grid-template-columns:repeat(auto-fill,minmax(min(20rem,100%),1fr))}figure{margin:0;border-radius:.4rem;overflow:hidden;background:var(--surface)}figure img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:contain}figcaption{padding:.4rem .6rem}.search{display:flex;align-items:center;gap:.5rem;border:1px solid var(--border);border-radius:.4rem;padding:.65rem}.search input{flex:1;border:0;background:transparent;color:inherit}.pagination{margin:.75rem 0}pre{max-height:40rem;overflow:auto;background:var(--surface);padding:1rem;border-radius:.4rem}.scale{display:grid;grid-template-columns:repeat(9,1fr);height:3rem;overflow:hidden;border-radius:.5rem;font-size:.75rem;font-variant-numeric:tabular-nums}.scale span{display:grid;place-items:center;background:var(--blue);color:white}.table-wrap{overflow-x:auto;margin-top:1rem}table{border-collapse:collapse;font-size:.75rem;font-variant-numeric:tabular-nums}th,td{padding:.35rem .5rem;white-space:nowrap;border:1px solid var(--border);text-align:right}th:first-child{position:sticky;left:0;z-index:1;background:var(--surface);text-align:left}td.energy{background:var(--blue);color:white}.no-data{filter:grayscale(.6)}.loading{color:var(--muted)}.error{color:#b91c1c;font-weight:600}@media(prefers-color-scheme:dark){:root{color-scheme:dark;--bg:#171717;--surface:#292929;--text:#f5f5f5;--muted:#aaa;--border:#555;--active:#164e63}}
`

function navLink(pathname: string, href: string, label: string) {
  const active = pathname === href || pathname.startsWith(`${href}/`)
  return html`<li>
    <a
      class="${active ? 'menu-active' : ''}"
      href="${href}"
      ${active ? raw('aria-current="page"') : ''}
      >${label}</a
    >
  </li>`
}

export function documentView(pathname: string, title: string, content: unknown) {
  return html`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title}</title>
        <style>
          ${raw(styles)}
        </style>
      </head>
      <body>
        <div class="page">
          <header class="navbar">
            <nav aria-label="Main navigation">
              <ul class="menu">
                ${navLink(pathname, '/stationCountries', 'Railway Station Countries ➡️')}
                ${navLink(pathname, '/openLibrary', 'Open Library ➡️')}
                ${navLink(pathname, '/energyCharts', 'Energy Charts ➡️')}
              </ul>
            </nav>
          </header>
          <main class="content">${content}</main>
        </div>
        <script
          type="module"
          src="https://cdn.jsdelivr.net/gh/starfederation/datastar@v1.0.2/bundles/datastar.js"
          integrity="sha384-SnyFlWTdFL3c8+9/1WsPuMFBq6AQOGC1LmS9upY4YkM3En3wZr5q2UvydHaMgOVG"
          crossorigin="anonymous"
        ></script>
      </body>
    </html>`
}

export function notFoundView(pathname: string) {
  return documentView(
    pathname,
    'Not found',
    html`<h1>Not found 🙁</h1>
      <p><a href="/">Home ➡️</a></p>`,
  )
}

export function serverErrorView(pathname: string) {
  return documentView(
    pathname,
    'Server error',
    html`<h1>Something went wrong</h1>
      <p role="alert">The page could not be loaded.</p>`,
  )
}

export function stationCountrySelector(countries: Country[], selectedCountry?: string) {
  return html`<div class="country-picker">
    <button class="button" type="button" popovertarget="station-country-list">
      Selected country: ${selectedCountry ? html`<strong>${selectedCountry}</strong>` : ''}
    </button>
    <div id="station-country-list" class="country-list" popover>
      ${countries.map(
        (country) =>
          html`<a href="/stationCountries/${encodeURIComponent(country.code)}">${country.name}</a>`,
      )}
    </div>
  </div>`
}

function safeUrl(value: string, base?: string) {
  try {
    const url = new URL(value, base)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : undefined
  } catch {
    return undefined
  }
}

function providerApp(app: ProviderApp) {
  const icon = app.type === 'web' ? '🌐' : app.type === 'android' ? '🤖' : '🍏'
  const url = safeUrl(app.url)
  const label = html`${icon} ${app.name} ↗️`
  return html`<li>
    ${url
      ? html`<a href="${url}" target="_blank" rel="noreferrer" title="${app.name} (${app.type})"
          >${label}</a
        >`
      : app.name}
  </li>`
}

export function stationCountriesView(countries: Country[]) {
  return html`${stationCountrySelector(countries)}
    <h1>Countries with apps</h1>
    <ul class="cards">
      ${countries.map(
        (country) => html`<li class="card">
          <h2>${country.name} <small>(${country.code})</small></h2>
          <p>
            Time Table Template:
            <code>${country.timetableUrlTemplate ?? '–'}</code>
          </p>
          <p>
            ${country.providerApps?.length ?? 0} App(s)${country.providerApps?.length ? ':' : ''}
          </p>
          ${country.providerApps?.length
            ? html`<ul class="provider-list">
                ${country.providerApps.map(providerApp)}
              </ul>`
            : ''}
        </li>`,
      )}
    </ul>`
}

export function loadingRegion(id: string, endpoint: string) {
  return html`<section
    id="${id}"
    class="loading"
    data-indicator:results-loading
    data-init="@get('${endpoint}')"
    data-attr:aria-busy="$resultsLoading"
    aria-live="polite"
  >
    <p role="status">Loading…</p>
    <p><a href="${endpoint}">Load data without JavaScript</a></p>
  </section>`
}

export function errorRegion(id: string) {
  return html`<section id="${id}" aria-live="polite">
    <p class="error" role="alert">Unable to load data.</p>
  </section>`
}

function photographerCard(photographer: Photographer) {
  const url = photographer.url && safeUrl(photographer.url)
  return html`<div class="card">
    <h3>${photographer.name}</h3>
    ${url ? html`<a href="${url}" target="_blank" rel="noreferrer">${photographer.url} ↗️</a>` : ''}
  </div>`
}

function stationPhoto(photo: Photo, photoBaseUrl: string, country: string) {
  const src = safeUrl(`${photoBaseUrl.replace(/\/$/, '')}/${photo.path.replace(/^\//, '')}`)
  return html`<figure>
    ${src
      ? html`<img
          width="384"
          height="216"
          loading="lazy"
          src="${src}"
          alt="Photo of a railway station in ${country.toUpperCase()} by ${photo.photographer}"
        />`
      : ''}
    <figcaption>
      by ${photo.photographer} at ${new Date(photo.createdAt).toLocaleDateString('en-GB')}
    </figcaption>
  </figure>`
}

export function stationDetailsView(
  country: string,
  stationPhotos: {
    photoBaseUrl: string
    stationsCount: number
    photographers: Photographer[]
    photos: Photo[]
  },
) {
  return html`<section id="station-details" aria-live="polite">
    <h1>Station Photos for <em>${country}</em></h1>
    <p>Station count: ${stationPhotos.stationsCount}</p>
    <h2>Photographers</h2>
    <div class="photographers">${stationPhotos.photographers.map(photographerCard)}</div>
    <h2>Station photos</h2>
    <div class="photos">
      ${stationPhotos.photos.map((photo) =>
        stationPhoto(photo, stationPhotos.photoBaseUrl, country),
      )}
    </div>
  </section>`
}

function searchUrl(path: string, q: string, page: number) {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (page !== 1) params.set('page', String(page))
  const query = params.toString()
  return `${path}${query ? `?${query}` : ''}`
}

export function openLibraryView(q: string, page: number) {
  return html`<form action="/openLibrary" method="get">
      <label class="search">
        <span role="img" aria-label="Search">🔍</span>
        <input type="search" name="q" value="${q}" />
        <kbd>Enter</kbd>
      </label>
    </form>
    <nav class="pagination" aria-label="Search result pages">
      <ul class="menu">
        ${[1, 2, 3].map(
          (number) => html`<li>
            <a
              class="${page === number ? 'menu-active' : ''}"
              href="${searchUrl('/openLibrary', q, number)}"
              ${page === number ? raw('aria-current="page"') : ''}
              >page ${number}</a
            >
          </li>`,
        )}
      </ul>
    </nav>
    ${loadingRegion('open-library-results', searchUrl('/api/openLibrary/search', q, page))}`
}

export function openLibraryResultsView(results: unknown) {
  return html`<section id="open-library-results" aria-live="polite">
    <pre>${JSON.stringify(results, null, 2)}</pre>
  </section>`
}

function countrySelector(selectedCountry?: string) {
  return html`<header>
    <ul class="menu">
      <li><strong>Selected country:</strong></li>
      ${sampleCountries.map((country) => {
        const active = country === selectedCountry
        return html`<li>
          <a
            class="${active ? 'menu-active' : ''}"
            href="/energyCharts/${country}"
            ${active ? raw('aria-current="page"') : ''}
            >${formatCountryName(country) ?? country.toUpperCase()}</a
          >
        </li>`
      })}
    </ul>
  </header>`
}

function colorScale() {
  const values = Array.from(
    { length: 9 },
    (_, index) =>
      ENERGY_CHART_HUE_ROTATION_MIN +
      (ENERGY_CHART_HUE_ROTATION_MAX - ENERGY_CHART_HUE_ROTATION_MIN) * (index / 8),
  )
  return html`<div
    class="scale"
    role="img"
    aria-label="Color scale from ${ENERGY_CHART_HUE_ROTATION_MIN} to ${ENERGY_CHART_HUE_ROTATION_MAX} MegaWatts (MW)"
  >
    ${values.map(
      (value) => html`<span
        style="filter:hue-rotate(${calculateEnergyChartHueRotation({ value })}deg)"
        >${formatEnergyChartDataPoint(Math.round(value))}</span
      >`,
    )}
  </div>`
}

export function energyChartsView(selectedCountry?: string) {
  return html`<h1>Energy Production per Region in Megawatts(MW)</h1>
    ${countrySelector(selectedCountry)} ${colorScale()}
    ${selectedCountry
      ? loadingRegion(
          'energy-power-data',
          `/api/energyCharts/power?country=${encodeURIComponent(selectedCountry)}`,
        )
      : ''}`
}

export function energyPowerView(powerData: ProductionModel) {
  return html`<section id="energy-power-data" aria-live="polite">
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th scope="col">Production Type</th>
            ${powerData.unix_seconds?.map(
              (unixSeconds) =>
                html`<th scope="col">${formatEnergyChartDataPointDate(unixSeconds)}</th>`,
            )}
          </tr>
        </thead>
        <tbody>
          ${powerData.production_types?.map(
            (productionType) => html`<tr>
              <th scope="row">${productionType.name}</th>
              ${productionType.data.map((value) => {
                const hasData = Boolean(value)
                return html`<td
                  class="energy ${hasData ? '' : 'no-data'}"
                  style="filter:${hasData
                    ? `hue-rotate(${calculateEnergyChartHueRotation({ value: value! })}deg)`
                    : 'grayscale(.6)'}"
                >
                  ${hasData ? formatEnergyChartDataPoint(value!) : 'no data'}
                </td>`
              })}
            </tr>`,
          )}
        </tbody>
      </table>
    </div>
  </section>`
}
