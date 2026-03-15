const counterValueElement = document.querySelector('#counter-value')
const incrementButtonElement = document.querySelector('#increment-button')
const statusTextElement = document.querySelector('#status-text')

if (!counterValueElement || !incrementButtonElement || !statusTextElement) {
  throw new Error('Required DataStar demo elements are missing.')
}

const counterState = {
  count: 0,
}

async function stateRoute() {
  statusTextElement.textContent = 'Loading state…'
  const response = await fetch('/api/state')

  if (!response.ok) {
    statusTextElement.textContent = 'Failed to load initial state.'
    return
  }

  const payload = await response.json()
  counterState.count = payload.count
  syncCounterState()
  statusTextElement.textContent = ''
}

async function incrementHandler() {
  incrementButtonElement.disabled = true
  statusTextElement.textContent = 'Incrementing…'

  const response = await fetch('/api/increment', {
    method: 'POST',
  })

  if (!response.ok) {
    statusTextElement.textContent = 'Increment failed.'
    incrementButtonElement.disabled = false
    return
  }

  const payload = await response.json()
  counterState.count = payload.count
  syncCounterState()
  statusTextElement.textContent = ''
  incrementButtonElement.disabled = false
}

function syncCounterState() {
  counterValueElement.textContent = String(counterState.count)
}

incrementButtonElement.addEventListener('click', () => {
  void incrementHandler()
})

void stateRoute()
