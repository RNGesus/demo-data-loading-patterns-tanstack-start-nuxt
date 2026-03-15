import { Hono } from 'hono'
import { getCounterCount } from '../lib/demo-counter'

const pageRoutes = new Hono()

pageRoutes.get('/', (context) => {
  const count = getCounterCount()
  const initialSignals = JSON.stringify({
    count,
    step: 1,
    mutationError: '',
    counterPending: false,
  })
  const clientScriptPath = import.meta.env.PROD ? '/assets/main.js' : '/src/client/main.ts'

  return context.html(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DataStar Hono Starter</title>
    <style>
      :root {
        color-scheme: light;
        --canvas: #f5f1e8;
        --surface: rgba(255, 252, 245, 0.92);
        --surface-strong: #fffaf0;
        --ink: #1f1a14;
        --muted: #65584a;
        --accent: #0f766e;
        --accent-strong: #115e59;
        --accent-soft: rgba(15, 118, 110, 0.14);
        --danger: #b42318;
        --border: rgba(31, 26, 20, 0.12);
        --shadow: 0 24px 70px rgba(31, 26, 20, 0.12);
        font-family: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        background:
          radial-gradient(circle at top left, rgba(15, 118, 110, 0.16), transparent 28rem),
          linear-gradient(160deg, #f7f3ea 0%, #ece2d0 100%);
        color: var(--ink);
      }

      .page {
        width: min(100%, 72rem);
        margin: 0 auto;
        padding: 3rem 1.25rem 4rem;
      }

      .hero {
        display: grid;
        gap: 1.5rem;
        align-items: start;
      }

      .eyebrow {
        margin: 0 0 0.75rem;
        color: var(--accent-strong);
        font-size: 0.82rem;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        max-width: 12ch;
        font-size: clamp(2.6rem, 6vw, 5rem);
        line-height: 0.95;
      }

      .intro {
        margin: 0;
        max-width: 38rem;
        color: var(--muted);
        font-size: 1.08rem;
        line-height: 1.65;
      }

      .panel-grid {
        display: grid;
        gap: 1.25rem;
        margin-top: 2.25rem;
      }

      .panel {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 1.5rem;
        box-shadow: var(--shadow);
        backdrop-filter: blur(16px);
      }

      .counter-panel {
        padding: 1.5rem;
      }

      .counter-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;
      }

      .counter-label {
        margin: 0;
        color: var(--muted);
        font-size: 0.96rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      .counter-value {
        margin: 0;
        font-size: clamp(4rem, 12vw, 7rem);
        font-weight: 700;
        letter-spacing: -0.06em;
        line-height: 0.9;
      }

      .counter-status {
        min-height: 1.5rem;
        color: var(--accent-strong);
        font-size: 0.95rem;
        font-weight: 600;
      }

      .controls {
        display: grid;
        gap: 1rem;
      }

      .field {
        display: grid;
        gap: 0.45rem;
      }

      .field label {
        font-size: 0.92rem;
        font-weight: 700;
      }

      .field input {
        width: 100%;
        padding: 0.9rem 1rem;
        border: 1px solid rgba(31, 26, 20, 0.18);
        border-radius: 1rem;
        background: var(--surface-strong);
        color: var(--ink);
        font: inherit;
      }

      .field-hint {
        margin: 0;
        color: var(--muted);
        font-size: 0.88rem;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.9rem;
        align-items: center;
      }

      .button {
        border: 0;
        border-radius: 999px;
        background: linear-gradient(135deg, var(--accent) 0%, #15847c 100%);
        color: white;
        padding: 0.95rem 1.4rem;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 18px 36px rgba(15, 118, 110, 0.24);
      }

      .button[disabled] {
        cursor: progress;
        opacity: 0.76;
        box-shadow: none;
      }

      .pending-pill {
        min-height: 1.5rem;
        padding: 0.28rem 0.75rem;
        border-radius: 999px;
        background: var(--accent-soft);
        color: var(--accent-strong);
        font-size: 0.88rem;
        font-weight: 700;
      }

      .error {
        min-height: 1.5rem;
        margin: 0;
        color: var(--danger);
        font-size: 0.95rem;
        font-weight: 700;
      }

      .notes {
        padding: 1.35rem 1.5rem;
      }

      .notes h2 {
        margin: 0 0 0.75rem;
        font-size: 1.2rem;
      }

      .notes p {
        margin: 0;
        color: var(--muted);
        line-height: 1.65;
      }

      @media (min-width: 56rem) {
        .hero {
          grid-template-columns: minmax(0, 1.1fr) minmax(22rem, 0.9fr);
        }

        .panel-grid {
          grid-template-columns: minmax(0, 1.3fr) minmax(20rem, 0.7fr);
          align-items: start;
        }
      }
    </style>
  </head>
  <body>
    <main class="page" data-signals='${initialSignals}'>
      <section class="hero">
        <div>
          <p class="eyebrow">DataStar Hono Starter</p>
          <h1>Server-owned counter, wired the DataStar way.</h1>
        </div>
        <p class="intro">
          The page is rendered by Hono, interactions post DataStar signals back to Hono, and the
          server responds with DataStar-compatible updates. The counter store is intentionally
          in-memory, so reload behavior reflects demo semantics rather than persistence.
        </p>
      </section>

      <section class="panel-grid">
        <section class="panel counter-panel" aria-labelledby="counter-title">
          <div class="counter-meta">
            <p class="counter-label" id="counter-title">Current count</p>
            <div class="counter-status" data-show="$counterPending">Server update in flight</div>
          </div>

          <p class="counter-value" data-text="$count">${count}</p>

          <div class="controls">
            <div class="field">
              <label for="counter-step">Increment step</label>
              <input
                id="counter-step"
                type="number"
                min="1"
                max="10"
                step="1"
                value="1"
                data-bind-step
              />
              <p class="field-hint">Any whole number from 1 to 10 will be accepted by the server.</p>
            </div>

            <div class="actions">
              <button
                id="counter-increment"
                class="button"
                type="button"
                data-indicator="$counterPending"
                data-attr-disabled="$counterPending"
                data-on-click="@post('/api/counter/increment')"
              >
                Increment on the server
              </button>
              <span class="pending-pill" data-show="$counterPending">Updating...</span>
            </div>

            <p class="error" aria-live="polite" data-text="$mutationError"></p>
          </div>
        </section>

        <aside class="panel notes">
          <h2>Starter semantics</h2>
          <p>
            The prerendered HTML captures the count that existed at build time. The live Node
            runtime keeps its own in-memory count after mutations, so future demos can later swap
            in persistence without changing the route structure.
          </p>
        </aside>
      </section>
    </main>

    <script type="module" src="${clientScriptPath}"></script>
  </body>
</html>`)
})

export { pageRoutes }
