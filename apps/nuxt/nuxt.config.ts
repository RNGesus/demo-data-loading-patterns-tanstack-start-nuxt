import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-expect-error -- Golar/TypeScript-Go currently exceeds its comparison depth on NuxtConfig.
export default defineNuxtConfig({
  modules: ['@nuxt/image'],
  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
    },
  ],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  css: ['./assets/styles/global.css'],
  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'exact-active',
    },
  },
  routeRules: {
    '/api/**': { cache: { maxAge: 60 } },
  },
  devServer: {
    port: 5000,
  },
  future: {
    compatibilityVersion: 5,
  },
  experimental: { typedPages: true, typescriptPlugin: true, nitroAutoImports: true },
  compatibilityDate: '2026-07-17',
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ['api.railway-stations.org'],
    ipx: { maxAge: 60 * 60 * 24 * 30 },
    quality: 75,
  },
})
