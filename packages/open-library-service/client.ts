import { createApiClient } from './generated/client'

/** @see https://openlibrary.org/developers/api -- for frequent use the user agent should be specified */
const userAgent = [
  import.meta.env.OPEN_LIBRARY_NAME,
  import.meta.env.OPEN_LIBRARY_APP_NAME,
  import.meta.env.OPEN_LIBRARY_EMAIL,
].join(' - ')

export const apiClient = createApiClient('https://openlibrary.org', {
  axiosConfig: {
    headers: {
      'User-Agent': userAgent,
    },
  },
})
