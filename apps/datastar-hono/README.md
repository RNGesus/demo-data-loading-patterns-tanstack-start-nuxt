# Datastar + Hono data-loading demo

Server-rendered Hono version of the repository's railway stations, Open Library, and Energy Charts demos.

## Run

From the monorepo root:

```bash
vp run datastar-hono#dev
```

Open `http://localhost:3004`.

Other commands:

```bash
vp run datastar-hono#typecheck
vp run datastar-hono#build
vp run datastar-hono#start
```

## Routes

Public pages:

- `GET /`
- `GET /stationCountries`
- `GET /stationCountries/:country`
- `GET /openLibrary?q=…&page=…`
- `GET /energyCharts`
- `GET /energyCharts/:country`

Datastar endpoints:

- `GET /api/stationCountries/stationPhotos/:country`
- `GET /api/openLibrary/search?q=…&page=…`
- `GET /api/energyCharts/power?country=…`
- `GET /health`

Documents, navigation, and forms are server rendered. Remote detail regions load through Datastar GET actions and are replaced with `datastar-patch-elements` events from the Datastar SDK. The browser bundle remains CDN-hosted.
