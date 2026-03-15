import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { CounterState } from './routes/state.ts'
import { incrementRoute } from './routes/increment.ts'
import { stateRoute } from './routes/state.ts'

const app = new Hono()
const counterState: CounterState = {
  count: 0,
}

stateRoute(app, counterState)
incrementRoute(app, counterState)

const currentDirectory = dirname(fileURLToPath(import.meta.url))
const clientDirectory = resolve(currentDirectory, '..', 'client')

app.get('/', async (context) => {
  const html = await readFile(resolve(clientDirectory, 'index.html'), 'utf8')
  return context.html(html)
})

app.get('/main.js', async () => {
  const javascript = await readFile(resolve(clientDirectory, 'main.js'), 'utf8')
  return new Response(javascript, {
    headers: {
      'content-type': 'text/javascript; charset=utf-8',
    },
  })
})

app.get('/health', (context) => context.text('ok'))

const port = 3001

serve({
  fetch: app.fetch,
  port,
})
