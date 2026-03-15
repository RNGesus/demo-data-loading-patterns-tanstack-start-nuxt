import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/image"],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  css: ["./assets/styles/global.css"],
  router: {
    options: {
      linkActiveClass: "active",
      linkExactActiveClass: "exact-active",
    },
  },
  routeRules: {
    "/api/**": { cache: { maxAge: 60 } },
  },
  devServer: {
    port: 5000,
  },
  future: {
    compatibilityVersion: 5,
  },
  experimental: { typedPages: true },
  compatibilityDate: "2026-03-15",
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ["api.railway-stations.org"],
    ipx: { maxAge: 60 * 60 * 24 * 30 },
    quality: 75,
  },
});
