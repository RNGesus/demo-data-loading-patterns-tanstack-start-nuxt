import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from '@tanstack/start/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  tsr: {
    autoCodeSplitting: true,
  },
  vite: {
    plugins: [
      tailwindcss(),
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
    resolve: {
      conditions: ['@project/railway-station-service'],
    },
  },
})