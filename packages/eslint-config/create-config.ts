import path from 'node:path'
import { fileURLToPath } from 'node:url'
import antfu from '@antfu/eslint-config'
import { includeIgnoreFile } from '@eslint/compat'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '..', '..', '.gitignore')

type AntfuParams = Parameters<typeof antfu>;
type Options = AntfuParams[0];
type UserConfigs = AntfuParams[1][];

export default function createConfig(options?: Options | undefined, ...userConfigs: UserConfigs) {
  return antfu({
    formatters: true,
    typescript: true,
    ...options,
  }, {
    files: ['tsconfig.json'],
    rules: {
      'jsonc/sort-keys': 'off',
    },
  }, includeIgnoreFile(gitignorePath), ...userConfigs)
}
