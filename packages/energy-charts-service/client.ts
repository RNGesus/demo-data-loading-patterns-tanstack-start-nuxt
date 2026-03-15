import type { Options as SdkOptions } from './generated/sdk.gen'
import type {
  PublicPowerPublicPowerGetData,
  PublicPowerPublicPowerGetResponse,
} from './generated/types.gen'
import { createClient, createConfig } from './generated/client'
import { client } from './generated/client.gen'
import { publicPowerPublicPowerGet as generatedPublicPowerPublicPowerGet } from './generated/sdk.gen'

export { client, createClient, createConfig }

type PublicPowerPublicPowerGetOptions = SdkOptions<PublicPowerPublicPowerGetData, true>

export const publicPowerPublicPowerGet = (
  options?: PublicPowerPublicPowerGetOptions,
): Promise<PublicPowerPublicPowerGetResponse> =>
  generatedPublicPowerPublicPowerGet({ ...options, throwOnError: true })
