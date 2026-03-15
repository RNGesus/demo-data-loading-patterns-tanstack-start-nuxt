import type { Jsonifiable } from '@starfederation/datastar-sdk/types'
import { ServerSentEventGenerator } from '@starfederation/datastar-sdk/web'
import { Hono } from 'hono'
import { disableSSG } from 'hono/ssg'
import { getCounterCount, incrementCounterCount } from '../../lib/demo-counter'

type SignalPatch = Record<string, Jsonifiable>
const sseHeaders = {
  'cache-control': 'no-cache',
  connection: 'keep-alive',
  'content-type': 'text/event-stream',
}

const counterApi = new Hono()

counterApi.use('*', disableSSG())

counterApi.get('/', (context) => {
  return context.json({
    count: getCounterCount(),
  })
})

counterApi.post('/increment', async (context) => {
  const parsedSignals = await ServerSentEventGenerator.readSignals(context.req.raw)

  if (!parsedSignals.success) {
    return context.json(
      {
        error: 'Expected a Datastar signal payload.',
        detail: parsedSignals.error,
      },
      400,
    )
  }

  const parsedStep = parseStep(parsedSignals.signals.step)

  if (!parsedStep.success) {
    return datastarSignalResponse(
      {
        mutationError: parsedStep.error,
      },
      422,
    )
  }

  return datastarSignalResponse({
    count: incrementCounterCount(parsedStep.step),
    mutationError: '',
  })
})

function datastarSignalResponse(signals: SignalPatch, status = 200) {
  return new Response(datastarMergeSignalsEvent(signals), {
    status,
    headers: sseHeaders,
  })
}

function datastarMergeSignalsEvent(signals: SignalPatch) {
  return `event: datastar-merge-signals\ndata: signals ${JSON.stringify(signals)}\n\n`
}

function parseStep(value: unknown) {
  if (value === undefined || value === '') {
    return { success: true as const, step: 1 }
  }

  const rawValue = typeof value === 'string' ? value.trim() : value
  const step = typeof rawValue === 'number' ? rawValue : Number(rawValue)

  if (!Number.isInteger(step) || step < 1 || step > 10) {
    return {
      success: false as const,
      error: 'Step must be a whole number between 1 and 10.',
    }
  }

  return { success: true as const, step }
}

export { counterApi }
