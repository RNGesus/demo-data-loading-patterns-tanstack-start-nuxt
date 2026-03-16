# DataStar + Hono data loading demo

This app now mirrors the functionality from the existing Nuxt and TanStack Start apps,
but rendered from one Hono app with SSR HTML pages.

## Features

- Railway station countries list and station photo details
- Open Library search with page query navigation
- Energy charts country navigation and data table
- Tailwind CSS v4 + DaisyUI v5 styling

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
- `src/routes/pages/index.ts` contains page handlers for stationCountries, openLibrary, and energyCharts
- `src/routes/api/*` contains API endpoints matching the Nuxt and TanStack integrations
- `src/styles/global.css` provides Tailwind and DaisyUI setup

## Verification

```bash
pnpm --filter datastar-hono typecheck
pnpm --filter datastar-hono build
```
