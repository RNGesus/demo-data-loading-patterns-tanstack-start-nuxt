import nodeBuild from '@hono/vite-build/node'
import devServer from '@hono/vite-dev-server'
import nodeAdapter from '@hono/vite-dev-server/node'
import ssg from '@hono/vite-ssg'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const appEntry = './src/app.ts'
const clientEntry = resolve(__dirname, 'src/client/main.ts')

export default defineConfig(({ command, mode }) => {
  const projectAlias = { '@project': resolve(__dirname, '../../packages') }

  if (command === 'serve') {
    return {
      resolve: { alias: projectAlias },
      plugins: [
        devServer({
          entry: appEntry,
          adapter: nodeAdapter(),
        }),
      ],
      server: {
        port: 3004,
      },
    }
  }

  if (mode === 'client') {
    return {
      resolve: { alias: projectAlias },
      build: {
        copyPublicDir: false,
        emptyOutDir: true,
        outDir: 'dist',
        rollupOptions: {
          input: clientEntry,
          output: {
            assetFileNames: 'assets/[name][extname]',
            chunkFileNames: 'assets/[name].js',
            entryFileNames: 'assets/main.js',
          },
        },
      },
    }
  }

  if (mode === 'ssg') {
    return {
      resolve: { alias: projectAlias },
      build: {
        copyPublicDir: false,
        emptyOutDir: false,
        outDir: 'dist',
      },
      plugins: [
        ssg({
          entry: appEntry,
        }),
      ],
    }
  }

  return {
    resolve: { alias: projectAlias },
    build: {
      copyPublicDir: false,
      outDir: 'dist',
    },
    plugins: [
      nodeBuild({
        emptyOutDir: false,
        entry: appEntry,
        output: 'server.js',
        outputDir: 'dist',
        port: 3004,
        staticRoot: './dist',
      }),
    ],
  }
})
