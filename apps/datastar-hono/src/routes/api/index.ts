import { Hono } from 'hono'
import { energyChartsApi } from './energyCharts'
import { openLibraryApi } from './openLibrary'
import { stationCountriesApi } from './stationCountries'

const apiRoutes = new Hono()

apiRoutes.route('/stationCountries', stationCountriesApi)
apiRoutes.route('/openLibrary', openLibraryApi)
apiRoutes.route('/energyCharts', energyChartsApi)

export { apiRoutes }
