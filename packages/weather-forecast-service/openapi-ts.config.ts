import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: './vendor/openapi.json',
  output: './generated',
  plugins: [
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: '../hey-api',
    },
    {
      name: '@hey-api/sdk',
      responseStyle: 'data',
      validator: true,
    },
    {
      name: 'zod',
    },
  ],
})
