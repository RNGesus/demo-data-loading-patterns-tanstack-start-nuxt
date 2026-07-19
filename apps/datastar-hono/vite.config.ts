import nodeBuild from '@hono/vite-build/node'
import devServer from '@hono/vite-dev-server'
import { nodeAdapter } from '@hono/vite-dev-server/node'
import { defineConfig } from 'vite-plus'

const appEntry = './src/app.ts'

export default defineConfig({
  build: {
    copyPublicDir: false,
    outDir: 'dist',
  },
  plugins: [
    devServer({
      entry: appEntry,
      adapter: nodeAdapter(),
    }),
    nodeBuild({
      emptyOutDir: true,
      entry: appEntry,
      output: 'server.js',
      outputDir: 'dist',
      port: 3004,
    }),
  ],
  server: {
    port: 3004,
  },
})
