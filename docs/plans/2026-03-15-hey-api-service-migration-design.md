# Hey API Service Migration Design

Date: 2026-03-15
Status: Approved
Scope: `packages/weather-forecast-service`, `packages/railway-station-service`, `packages/open-library-service`, `packages/energy-charts-service`

## Goal

Migrate the service packages that currently use `openapi-zod-client` to `@hey-api/openapi-ts` while preserving the existing package-level organization as much as practical.

The migration should:

- keep `vendor/` as the source OpenAPI spec location
- keep package-local generation ownership instead of introducing a central repo generator
- follow Hey API best practices rather than forcing the old generated file layout onto the new tool
- avoid `@hey-api/nuxt`
- allow consumer-facing API changes, including moving away from `apiClient.<operation>()`
- keep runtime validation through the Hey API SDK validator support backed by the Zod plugin

## Current State

Each service package follows the same general pattern:

- `vendor/` contains the downloaded OpenAPI spec
- `generated/client.ts` is produced by `openapi-zod-client`
- handwritten `client.ts` creates and exports `apiClient`
- optional `transforms.ts` reshapes response data for app consumption
- optional `types.ts` provides useful aliases, often inferred from generated Zod-backed schema objects

Current consumers in `apps/tanstack-start` and `apps/nuxt` import:

- `apiClient` from `client.ts`
- a small number of curated types from `types.ts`
- package transforms where applicable

## Chosen Approach

Use `@hey-api/openapi-ts` per package with:

- `@hey-api/client-fetch` as the runtime client
- `@hey-api/sdk` as the generated consumer-facing API
- the Zod plugin to generate validators and schema artifacts
- a package-local runtime config file for default base URL and headers
- handwritten `client.ts` and `types.ts` files as stable package entrypoints

This approach was chosen because it:

- aligns with the official Hey API documentation and defaults
- keeps each package self-contained and close to its OpenAPI source
- works for both TanStack Start and Nuxt without framework-specific integration
- preserves the familiar package structure while accepting native Hey API generated output inside `generated/`
- avoids the non-tree-shakeable class SDK mode

## Package Architecture

Each migrated package will follow this shape:

- `vendor/`: unchanged, source OpenAPI document
- `openapi-ts.config.ts`: package-local generator config
- `generated/`: native Hey API output such as `client.gen.ts`, `sdk.gen.ts`, `types.gen.ts`, `zod.gen.ts`
- `hey-api.ts` or equivalent: handwritten runtime config referenced by the generator
- `client.ts`: handwritten public runtime entrypoint
- `types.ts`: handwritten curated type entrypoint
- optional `transforms.ts`: unchanged in purpose

The `generated/` directory should follow Hey API conventions rather than trying to mimic the old single-file layout.

## Public Package Contract

### `client.ts`

`client.ts` becomes a thin public facade over the generated SDK and client output.

It should:

- re-export the generated SDK functions that apps should call directly
- optionally re-export the generated client and client factory when useful
- avoid recreating an object-shaped `apiClient` compatibility layer unless a package has a specific need

Consumer code will migrate from:

- `apiClient.getPhotoStationByCountry(...)`

to imports of generated SDK functions exposed by the package facade.

### `types.ts`

`types.ts` remains the stable curated type surface.

It should:

- re-export or alias generated types from `generated/types.gen.ts`
- use `z.infer` against generated Zod schemas only where schema-derived aliases are genuinely useful
- avoid forcing consumers to import directly from generated files

### `transforms.ts`

`transforms.ts` remains a handwritten post-fetch transformation layer. It should continue to accept validated API data and return app-friendly shapes.

## Runtime Configuration

Each package should configure its default client through a package-local runtime config file referenced by `runtimeConfigPath`.

This is preferred over relying only on `setConfig()` after import because it ensures generated SDK calls have correct defaults at initialization time.

Expected package-specific defaults:

- `railway-station-service`: base URL only
- `energy-charts-service`: base URL only
- `weather-forecast-service`: base URL only
- `open-library-service`: base URL plus `User-Agent` header derived from environment variables

## Data Flow

The request flow after migration should be:

1. App imports a named SDK function from the package `client.ts` facade.
2. The generated SDK function uses the generated Fetch client.
3. The generated client is initialized through the package runtime config file with the proper base URL and headers.
4. Request and response validation run through SDK validator support backed by generated Zod schemas.
5. Optional `transforms.ts` converts validated response data into app-specific shapes.
6. Apps consume the transformed result or the validated SDK result directly.

This keeps validation and transport concerns inside the service package boundary.

## Error Handling

Error handling should remain simple and local:

- transport failures should surface as thrown client errors
- non-2xx responses should surface as thrown client errors
- request or response contract mismatches should fail through Zod-backed validation
- package code should not broadly catch and reshape errors unless a package has a clear domain-specific reason

Existing app-level behavior that intentionally normalizes errors can remain in the app layer. The current `energyCharts` server function is an example of this pattern.

## Testing And Verification

The migration should be verified through generation, type safety, and focused runtime behavior checks instead of testing generated files directly.

Required verification:

- each package can generate from its `vendor/` spec through its local config
- workspace typecheck passes after consumer imports are migrated
- package runtime config works for base URLs and headers
- existing transforms continue to typecheck and behave correctly against migrated types

Recommended test scope:

- no snapshot testing of generated files
- add focused tests only where handwritten logic exists
- smoke-test generation as part of package scripts or repo workflow

## Migration Plan

### Phase 1: Generator Setup

- add `@hey-api/openapi-ts`, `@hey-api/client-fetch`, and required plugin dependencies
- remove `openapi-zod-client` and `@zodios/core` from service packages
- add package-local `openapi-ts.config.ts` files
- add package-local runtime config files for base URL and header defaults
- replace `create-api-client` scripts with Hey API generation commands

### Phase 2: Package Surface Migration

- regenerate each package into native Hey API `generated/` output
- rewrite handwritten `client.ts` files to expose generated SDK functions
- rewrite handwritten `types.ts` files to alias or re-export generated Hey API types and selected Zod-inferred types
- keep `transforms.ts` intact, adjusting imports and type references as needed

### Phase 3: App Consumer Migration

- update TanStack Start imports from `apiClient` method calls to named SDK function imports
- update Nuxt imports in the same way
- preserve existing app-side query validation and transform usage where it still adds value

### Phase 4: Verification

- regenerate all package clients
- run workspace typecheck
- run any package or app checks needed to confirm runtime config and migration correctness

## Non-Goals

- introducing `@hey-api/nuxt`
- preserving the old object-based `apiClient` surface
- forcing Hey API output into the old `generated/client.ts` shape
- adding broad new abstractions across all service packages beyond what Hey API already provides

## References

- Fetch client docs: https://heyapi.dev/openapi-ts/clients/fetch
- SDK plugin docs: https://heyapi.dev/openapi-ts/plugins/sdk
- Zod plugin docs: https://heyapi.dev/openapi-ts/plugins/zod

## Outcome

After implementation, the service packages should:

- keep their current package-level structure and ownership model
- use native Hey API generated output inside `generated/`
- expose a clean handwritten package facade through `client.ts` and `types.ts`
- provide runtime validation through the Hey API SDK and Zod plugins
- support both TanStack Start and Nuxt without framework-specific Hey API integration
