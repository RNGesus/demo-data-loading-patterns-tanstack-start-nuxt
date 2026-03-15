# DataStar Hono Starter

Starter app for future demos built around one Hono app, a Vite-powered dev/build flow, prerendered
public pages, and live API routes.

## Run

From the monorepo root:

```bash
pnpm --filter datastar-hono dev
```

Or use the workspace shortcut:

```bash
pnpm dev:datastar-hono
```

Open `http://localhost:3000`.

## Scripts

- `pnpm --filter datastar-hono dev` starts the Vite dev server around the Hono app.
- `pnpm --filter datastar-hono typecheck` runs TypeScript without emitting files.
- `pnpm --filter datastar-hono build` builds client assets, prerendered pages, and the Node server.
- `pnpm --filter datastar-hono start` runs the built Node server from `dist/server.js`.

## Structure

- `src/app.ts` exports the single Hono app used by dev, SSG, and server builds.
- `src/routes/pages.ts` defines prerenderable public pages.
- `src/routes/api/counter.ts` handles the counter API.
- `src/lib/demo-counter.ts` contains the demo-only in-memory store.
- `src/client/main.ts` loads Datastar and handles request lifecycle edge cases.

## Counter demo

The starter counter demonstrates:

- initial server-rendered state from Hono
- Datastar `@post(...)` interactions instead of manual `fetch` wiring
- server-driven signal patches via `@starfederation/datastar-sdk/web`
- visible mutation failures for invalid or broken requests

The counter store is intentionally in-memory. A prerendered page can therefore diverge from the live
runtime state after mutations until a persistent backing store replaces the demo module.

## Endpoints

- `GET /` renders the starter page.
- `GET /api/counter` returns the current counter state as JSON.
- `POST /api/counter/increment` validates the Datastar signal payload and returns Datastar updates.
- `GET /health` returns a basic liveness response.

## Verification

```bash
pnpm --filter datastar-hono typecheck
pnpm --filter datastar-hono build
```
