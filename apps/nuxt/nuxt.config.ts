// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  devtools: {
    enabled: true,
  },
  devServer: {
    port: 5000,
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-12-30',
  eslint: {
    config: {
      stylistic: true,
      standalone: false,
    },
  },
})
