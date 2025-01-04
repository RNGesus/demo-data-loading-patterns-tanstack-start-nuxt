/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly OPEN_LIBRARY_NAME: string
  readonly OPEN_LIBRARY_APP_NAME: string
  readonly OPEN_LIBRARY_EMAIL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
