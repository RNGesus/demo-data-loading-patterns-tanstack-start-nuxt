import type { ClientOptions, Config } from './generated/client/types.gen'
import { createConfig } from './generated/client/utils.gen'

const defaultBaseUrl = 'https://api-open.data.gov.sg/v2/real-time/api'

export const createClientConfig = (override: Config<ClientOptions> = {}) =>
  createConfig<ClientOptions>({
    ...override,
    baseUrl: override.baseUrl ?? defaultBaseUrl,
    responseStyle: override.responseStyle ?? 'data',
    throwOnError: override.throwOnError ?? true,
  })
