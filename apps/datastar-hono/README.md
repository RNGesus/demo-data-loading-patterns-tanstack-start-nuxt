# DataStar + Hono

Minimal demo app that serves a Hono API and a Vite client page with DataStar-style bindings.

## Run

From the monorepo root:

```bash
pnpm --filter datastar-hono dev
```

Or use the workspace shortcut:

```bash
pnpm dev:datastar-hono
```

## Endpoints

- `GET /api/state` - returns the current counter state.
- `POST /api/increment` - increments and returns the updated counter state.
- `GET /health` - basic API health check.

## Where DataStar bindings live

- `src/client/index.html` contains the DataStar script include and `data-*` bindings.
- `src/client/main.ts` bootstraps state fetching and increment interactions for the demo counter.
- `src/server/routes/*.ts` hosts the API routes used by the page.

## Checks

```bash
pnpm --filter datastar-hono lint
pnpm --filter datastar-hono typecheck
pnpm --filter datastar-hono build
```
