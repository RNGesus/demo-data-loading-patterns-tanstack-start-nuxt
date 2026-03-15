import { defineConfig } from 'oxfmt'

export default defineConfig({
  ignorePatterns: ['**/generated/**', '**/vendor/**', '**/routeTree.gen.ts'],
  singleQuote: true,
  semi: false,
  sortImports: {
    groups: [
      'type-import',
      ['value-builtin', 'value-external'],
      'type-internal',
      'value-internal',
      ['type-parent', 'type-sibling', 'type-index'],
      ['value-parent', 'value-sibling', 'value-index'],
      'unknown',
    ],
    newlinesBetween: false,
  },
  sortTailwindcss: {},
})
