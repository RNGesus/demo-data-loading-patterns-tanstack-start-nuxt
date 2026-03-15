# DataStar Hono Starter Design

Date: 2026-03-15
Status: Approved
Scope: `apps/datastar-hono`

## Goal

Turn `apps/datastar-hono` into a clean starter for future demos, beginning with a working counter example.

The starter should:

- use a single Hono app as the source of truth
- use `@hono/vite-ssg` for prerendered public pages
- use `@hono/vite-build` for the live Node server
- demonstrate real DataStar-driven server interaction instead of manual DOM wiring
- provide a structure that can support additional demos later without reworking the foundation

## Current Problems

The current app mixes incompatible approaches:

- `index.html` includes DataStar bindings
- `main.ts` uses imperative DOM and `fetch` logic instead of DataStar patterns
- a checked-in `main.js` shadows the TypeScript source
- `vite.config.ts` exists but is not part of the active dev/build flow
- the Hono server directly reads client files instead of using a coherent Vite pipeline

This makes the broken counter a symptom of an incomplete architecture rather than an isolated bug.

## Chosen Approach

Use one Hono app with split Vite-driven outputs.

The Hono app defines both page routes and API routes. Public pages are prerendered with `@hono/vite-ssg`, while `/api/*` remains live and is built for Node with `@hono/vite-build`.

This was chosen because it:

- satisfies the requirement for one app
- uses `@hono/vite-ssg` and `@hono/vite-build` for their intended roles
- avoids route drift between page generation and API behavior
- creates a reusable starter instead of another one-off demo

## Architecture

The starter will have a single exported Hono app and multiple Vite build modes around it.

Planned shape:

- `src/app.ts`: compose and export the Hono app
- `src/routes/pages.tsx` or equivalent: page routes used for prerendering
- `src/routes/api/counter.ts`: counter endpoints
- `src/lib/demo-counter.ts`: in-memory demo store
- `src/client/main.ts`: browser bootstrap code only where DataStar needs it
- `vite.config.ts`: dev mode plus client, SSG, and server builds
- `package.json`: explicit scripts for dev, build, and typecheck

Build responsibilities:

- dev: Vite-powered development workflow around the Hono app
- client build: browser assets
- SSG build: prerender static pages with `@hono/vite-ssg`
- server build: live Node runtime for `/api/*` with `@hono/vite-build`

## Data Flow

The first demo should be a server-driven DataStar counter.

Rules for the demo:

- the initial page renders a correct count from the server
- user actions post to Hono endpoints
- Hono endpoints return DataStar-compatible responses for UI updates
- the client does not own the counter logic through manual DOM and `fetch` wiring
- the in-memory counter store is explicitly demo-only

This establishes the pattern for future demos:

- server-owned state
- declarative DataStar bindings
- narrow browser bootstrap code
- reusable Hono route composition

## Error Handling

- counter endpoints should return clear non-200 responses for invalid requests
- the page should expose a visible failure state for mutation failures
- demo state should stay isolated in one module so persistence can replace it later without rewriting routes

## Verification

The starter should be considered correct when:

- `typecheck` passes
- `build` exercises both prerendered output and server output
- `/` renders the initial count correctly
- increment updates the UI through the intended DataStar flow
- reload behavior is consistent with documented in-memory demo semantics

## Known Tradeoff

The counter store is intentionally in-memory for the starter. Because of that, prerendered output and live runtime state can diverge after mutations.

That is acceptable for the first demo as long as it is clearly documented as demo behavior. The long-term path is to swap the demo store for a persistent backing implementation later.

## Non-Goals

- adding persistence in the starter
- expanding beyond the counter demo in this phase
- preserving the current manual DOM-based client approach

## Outcome

After implementation, `apps/datastar-hono` should be a reliable starter app that demonstrates:

- one Hono app
- Vite-managed client and build flow
- prerendered pages with live API routes
- a working DataStar counter as the first reusable demo pattern
