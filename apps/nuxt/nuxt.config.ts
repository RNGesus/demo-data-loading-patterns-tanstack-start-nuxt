import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image'],
  imports: {
    dirs: ['@project/vue-components'],
  },
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
    compatibilityVersion: 4,
  },
  experimental: { typedPages: true },
  compatibilityDate: '2025-01-13',
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      stylistic: true,
      standalone: false,
    },
  },
  image: {
    domains: ['api.railway-stations.org'],
    provider: 'ipx',
    ipx: { },
    quality: 75,
  },
})
