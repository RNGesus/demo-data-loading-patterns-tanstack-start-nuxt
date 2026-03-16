# DataStar + Hono data loading demo

This app mirrors the functionality from the existing Nuxt and TanStack Start apps,
but runs as one Hono app with Hono JSX templates and Datastar-enhanced interactions.

## Features

- Railway station countries list and station photo details
- Open Library search with Datastar signal-based updates
- Energy charts country navigation and data table
- Tailwind + DaisyUI styling

## Run

From the monorepo root:

```bash
pnpm --filter datastar-hono dev
```

Open `http://localhost:3004`.

## Scripts

- `pnpm --filter datastar-hono dev` runs the Vite + Hono dev server
- `pnpm --filter datastar-hono typecheck` runs TypeScript checks
- `pnpm --filter datastar-hono build` builds client assets, prerendered pages, and server bundle
- `pnpm --filter datastar-hono start` starts the built server

## Structure

- `src/app.ts` wires page and API routes
- `src/components/Layout.tsx` provides the shared Hono JSX layout
- `src/routes/pages/index.tsx` contains page handlers for stationCountries, openLibrary, and energyCharts
- `src/routes/api/*` contains API endpoints matching the Nuxt and TanStack integrations

## Verification

```bash
pnpm --filter datastar-hono typecheck
pnpm --filter datastar-hono build
```
