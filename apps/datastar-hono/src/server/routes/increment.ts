import type { Context, Hono } from 'hono'
import type { CounterState } from './state.ts'

export function incrementRoute(app: Hono, counterState: CounterState) {
  app.post('/api/increment', (context) => {
    counterState.count += 1

    return jsonIncrementResponse(context, counterState)
  })
}

function jsonIncrementResponse(context: Context, counterState: CounterState) {
  return context.json({
    count: counterState.count,
  })
}
