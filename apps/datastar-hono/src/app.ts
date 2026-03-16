import { Hono } from 'hono'
import { apiRoutes } from './routes/api'
import { pageRoutes } from './routes/pages'

const app = new Hono()

app.route('/', pageRoutes)
app.route('/api', apiRoutes)

app.get('/health', (context) => context.text('ok'))

export default app
