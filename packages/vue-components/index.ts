import type { App } from 'vue'
import * as components from './src/index'

export * from './src/index'

// TODO: improve or remove
export default {
  install: (app: App) => {
    for (const c in components) {
      app.use(components[c])
    }
  },
}
