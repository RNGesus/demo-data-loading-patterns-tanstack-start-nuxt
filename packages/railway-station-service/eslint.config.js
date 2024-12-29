import createConfig from '@project/eslint-config/create-config'

export default createConfig({}, {
  ignores: ['generated/*', 'vendor/*'],
})
