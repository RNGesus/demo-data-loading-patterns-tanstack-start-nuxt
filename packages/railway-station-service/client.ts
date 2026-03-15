import type { Options as SdkOptions } from './generated/sdk.gen'
import type {
  GetCountriesData,
  GetCountriesResponse,
  GetPhotoStationByCountryData,
  GetPhotoStationByCountryResponse,
} from './generated/types.gen'
import { createClient, createConfig } from './generated/client'
import { client } from './generated/client.gen'
import {
  getCountries as generatedGetCountries,
  getPhotoStationByCountry as generatedGetPhotoStationByCountry,
} from './generated/sdk.gen'

export { client, createClient, createConfig }

type GetCountriesOptions = SdkOptions<GetCountriesData, true>
type GetPhotoStationByCountryOptions = SdkOptions<GetPhotoStationByCountryData, true>

export const getCountries = (options?: GetCountriesOptions): Promise<GetCountriesResponse> =>
  generatedGetCountries({ ...options, throwOnError: true })

export const getPhotoStationByCountry = (
  options: GetPhotoStationByCountryOptions,
): Promise<GetPhotoStationByCountryResponse> =>
  generatedGetPhotoStationByCountry({ ...options, throwOnError: true })
