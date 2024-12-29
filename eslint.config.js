import path from 'node:path'
import { fileURLToPath } from 'node:url'
import antfu from '@antfu/eslint-config'
import { includeIgnoreFile } from '@eslint/compat'
import pluginRouter from '@tanstack/eslint-plugin-router'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default antfu({
  react: true,
  formatters: true,
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
}, {
  ignores: [
    // auto-generated
    'api/client.ts',
    'api/openapi.yaml',
    // auto-generated
    'app/routeTree.gen.ts',
  ],
}, includeIgnoreFile(gitignorePath), {
  files: ['tsconfig.json'],
  rules: {
    'jsonc/sort-keys': 'off',
  },
}, ...pluginRouter.configs['flat/recommended'])
