/// <reference types="vite/client" />

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import viteTsConfigPaths from 'vite-tsconfig-paths'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default defineConfig({
  server: {
    fs: {
      allow: ['..', '..'],
    },
  },
  plugins: [
    vue(),
    // TODO: fix type issues
    Components({ dirs: ['src'], dts: true, types: [{
      from: 'vue-components',
      names: ['Photos', 'Photographers'],
    }], directoryAsNamespace: true, globalNamespaces: ['global'] }),
    // TODO: check whether this is needed or "Components" is enough
    dts(),
    viteTsConfigPaths({ projects: ['./tsconfig.json'] }),
  ],
  // TODO: finalize build config
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'components',
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
