import { Hono } from 'hono'
import { dataRoutes } from './routes/data'
import { pageRoutes } from './routes/pages'
import { notFoundView, serverErrorView } from './views'

const app = new Hono()

app.route('/', pageRoutes)
app.route('/api', dataRoutes)
app.get('/health', (context) => context.text('ok'))
app.notFound(async (context) => context.html(await notFoundView(context.req.path), 404))
app.onError(async (error, context) => {
  console.error(error)
  return context.html(await serverErrorView(context.req.path), 500)
})

export default app
