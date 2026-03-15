import type { Context, Hono } from 'hono'

export interface CounterState {
  count: number
}

export function stateRoute(app: Hono, counterState: CounterState) {
  app.get('/api/state', (context) => {
    return jsonStateResponse(context, counterState)
  })
}

function jsonStateResponse(context: Context, counterState: CounterState) {
  return context.json({
    count: counterState.count,
  })
}
