import type { ClientOptions, Config } from './generated/client/types.gen'
import { createConfig, mergeHeaders } from './generated/client/utils.gen'

const defaultBaseUrl = 'https://openlibrary.org'

function readEnv(name: string): string | undefined {
  return (
    (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.[name] ??
    globalThis.process?.env?.[name]
  )
}

function getUserAgent() {
  return [readEnv('OPEN_LIBRARY_APP_NAME'), readEnv('OPEN_LIBRARY_EMAIL')]
    .filter(Boolean)
    .join(' - ')
}

export const createClientConfig = (override: Config<ClientOptions> = {}) => {
  const userAgent = getUserAgent()
  const headers = mergeHeaders(
    userAgent ? { 'User-Agent': userAgent } : undefined,
    override.headers,
  )

  return createConfig<ClientOptions>({
    ...override,
    baseUrl: override.baseUrl ?? defaultBaseUrl,
    headers,
    responseStyle: override.responseStyle ?? 'data',
    throwOnError: override.throwOnError ?? true,
  })
}
