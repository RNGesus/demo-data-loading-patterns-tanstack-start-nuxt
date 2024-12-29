import { createRouter as createTanStackRouter, ErrorComponent, Link } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPendingComponent: () => (
      <div style={{ padding: '1rem' }}>
        <style>
          {`
            @keyframes rotate {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
        <div style={{ animation: 'infinite rotate 1s' }}>🌀</div>
      </div>
    ),
    defaultErrorComponent: ({ error }) => (<ErrorComponent error={error} />),
    defaultNotFoundComponent: () => (
      <div>
        <h1>Not found 🙁</h1>
        <Link to="/">Home</Link>
      </div>
    ),
  })
  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
