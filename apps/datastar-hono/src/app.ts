import { Hono } from 'hono'
import { counterApi } from './routes/api/counter'
import { pageRoutes } from './routes/pages'

const app = new Hono()

app.route('/', pageRoutes)
app.route('/api/counter', counterApi)

app.get('/health', (context) => context.text('ok'))

export default app
