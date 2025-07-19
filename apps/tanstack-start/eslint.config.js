import createConfig from '@project/eslint-config/create-config'
import pluginRouter from '@tanstack/eslint-plugin-router'

export default createConfig({
  react: true,
}, ...pluginRouter.configs['flat/recommended'], {
  ignores: ['src/routeTree.gen.ts'],
})
