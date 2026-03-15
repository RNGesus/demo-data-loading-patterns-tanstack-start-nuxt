import type { Options as SdkOptions } from './generated/sdk.gen'
import type {
  GetTwentyFourHrForecastData,
  GetTwentyFourHrForecastResponse,
} from './generated/types.gen'
import { createClient, createConfig } from './generated/client'
import { client } from './generated/client.gen'
import { getTwentyFourHrForecast as generatedGetTwentyFourHrForecast } from './generated/sdk.gen'

export { client, createClient, createConfig }

type GetTwentyFourHrForecastOptions = SdkOptions<GetTwentyFourHrForecastData, true>

export const getTwentyFourHrForecast = (
  options?: GetTwentyFourHrForecastOptions,
): Promise<GetTwentyFourHrForecastResponse> =>
  generatedGetTwentyFourHrForecast({ ...options, throwOnError: true })
