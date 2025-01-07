# TanStack Start / Nuxt playground

based on [TanStack Start "Getting Started" section](https://tanstack.com/router/latest/docs/framework/react/start/getting-started)

## 🌬️ Wind of change

Well, it is still a playground but I got the hang of it and will try to do more.

### 🥚 Current state (or rather the starting point)

- TanStack Start setup with a single route
  - 💬 what a time sink, but a fun one - so many things to try
- use `openapi-zod-client` to create a type-safe API client from an OpenAPI spec
  - 💬 so easy and it is at least a good starter
- the home route requests a list of countries in a loader, which is then rendered (nicely, of course 💅)
  - 💬 this was my top priority but then all these yaks started showing up
- add DaisyUI 5 and Tailwind 4
  - 💬 works well for now, looking forward to finding some bugs
- use antfu's ESLint config as a base
  - 💬 awesome 🫳🎤
  - 💬 flat config in general is great, it is way too easy to extend and I have a lot of ideas
  - 💬 do yourself a favour and try the ESLint config inspector `pnpm dlx @eslint/config-inspector`

### 🚶‍➡️ Next steps

- [x] add another app next to the tanstack start one to get a good comparison
  - I guess DaisyUI 5 will be fine
- [x] init a monorepo
  - [x] apps:
    - [x] tanstack start
    - [x] nuxt
  - [x] packages:
    - [x] the railway station api
    - [x] eslint config
    - [ ] &hellip;
- [ ] create more (nested) routes
- [ ] use different loader patterns
- [ ] improve api client generation
  - [ ] replace vendored OpenAPI yaml file with an on-demand download
  - [ ] hook into post-install step and/or dev/build tasks
- [ ] overhaul README

### 🚿 Shower thoughts

- [ ] local-first functionality: store user individual data like favorites, previous selections/combinations
