import type { Options as SdkOptions } from './generated/sdk.gen'
import type {
  ReadSearchJsonSearchJsonGetData,
  ReadSearchJsonSearchJsonGetResponses,
} from './generated/types.gen'
import { createClient, createConfig } from './generated/client'
import { client } from './generated/client.gen'
import { readSearchJsonSearchJsonGet as generatedReadSearchJsonSearchJsonGet } from './generated/sdk.gen'

export { client, createClient, createConfig }

type ReadSearchJsonSearchJsonGetOptions = SdkOptions<ReadSearchJsonSearchJsonGetData, true>
type ReadSearchJsonSearchJsonGetResponse = ReadSearchJsonSearchJsonGetResponses[200]

export const readSearchJsonSearchJsonGet = (
  options: ReadSearchJsonSearchJsonGetOptions,
): Promise<ReadSearchJsonSearchJsonGetResponse> =>
  generatedReadSearchJsonSearchJsonGet({ ...options, throwOnError: true })
