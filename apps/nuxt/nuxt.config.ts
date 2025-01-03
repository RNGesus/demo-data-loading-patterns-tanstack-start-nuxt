// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image'],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  devServer: {
    port: 5000,
  },
  future: {
    compatibilityVersion: 4,
  },
  experimental: { typedPages: true },
  compatibilityDate: '2024-12-30',
  eslint: {
    config: {
      stylistic: true,
      standalone: false,
    },
  },
  image: {
    domains: ['api.railway-stations.org'],
    provider: 'ipx',
    ipx: {
    },
    quality: 75,
  },
})
