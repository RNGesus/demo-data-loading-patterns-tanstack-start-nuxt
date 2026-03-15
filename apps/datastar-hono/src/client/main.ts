import '@starfederation/datastar/bundles/datastar'

const counterButtonId = 'counter-increment'
const datastarSseEvent = 'datastar-sse'
const datastarMergeSignalsEvent = 'datastar-merge-signals'

interface DatastarSseDetail {
  type: string
  elId: string
  argsRaw: Record<string, string>
}

document.addEventListener(datastarSseEvent, (event) => {
  if (!(event instanceof CustomEvent)) {
    return
  }

  const detail = event.detail as DatastarSseDetail

  if (detail.elId !== counterButtonId) {
    return
  }

  switch (detail.type) {
    case 'started':
      patchSignals({ mutationError: '' })
      break
    case 'error':
      patchSignals({
        mutationError: messageForStatus(detail.argsRaw.status),
      })
      break
    case 'retries-failed':
      patchSignals({
        mutationError: 'The request could not reach the server. Try again.',
      })
      break
  }
})

function patchSignals(signals: Record<string, string>) {
  ;(document as unknown as EventTarget).dispatchEvent(
    new CustomEvent(datastarSseEvent, {
      detail: {
        type: datastarMergeSignalsEvent,
        elId: counterButtonId,
        argsRaw: {
          signals: JSON.stringify(signals),
        },
      },
    }) as Event,
  )
}

function messageForStatus(status: string | undefined) {
  switch (status) {
    case '400':
      return 'The counter request was malformed.'
    case '422':
      return 'Step must be a whole number between 1 and 10.'
    case '500':
      return 'The server could not update the counter.'
    default:
      return 'The counter request failed.'
  }
}
