import { Hono } from 'hono'
import { getCountries, getPhotoStationByCountry } from '@project/railway-station-service/client'
import { toStationPhotos } from '@project/railway-station-service/transforms'

const stationCountriesApi = new Hono()

stationCountriesApi.get('/countries', async (context) => {
  try {
    return context.json(await getCountries())
  } catch (error) {
    return context.json({ error: String(error) }, 502)
  }
})

stationCountriesApi.get('/stationPhotos/:country', async (context) => {
  try {
    const country = context.req.param('country')
    const photoStations = await getPhotoStationByCountry({
      path: { country },
    })

    return context.json(toStationPhotos(photoStations))
  } catch (error) {
    return context.json({ error: String(error) }, 502)
  }
})

export { stationCountriesApi }
