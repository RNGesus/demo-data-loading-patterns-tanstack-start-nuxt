import createConfig from '@project/eslint-config/create-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(createConfig({}, {}))
