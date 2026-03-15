# Hono + Datastar

This app will host a Hono server with Datastar-powered frontend interactions.

## Setup

From the repository root:

```bash
pnpm install
```

## Development

Start this app in watch mode:

```bash
pnpm --filter hono-datastar dev
```

Or use the root shortcut:

```bash
pnpm dev:hono-datastar
```

## Quality checks

```bash
pnpm --filter hono-datastar lint
pnpm --filter hono-datastar typecheck
```
