import { createRouter as createTanStackRouter, ErrorComponent, Link } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    // TODO: find a way to debounce the hover behavior
    // defaultPreload: 'intent',
    defaultPendingComponent: () => (
      <div className="grid place-content-center place-items-center h-dvh"style={{ padding: '1rem' }}>
        <div className="animate-spin text-5xl">😵‍💫</div>
      </div>
    ),
    defaultErrorComponent: ({ error }) => (<ErrorComponent error={error} />),
    defaultNotFoundComponent: () => (
      <div className="grid place-items-center place-content-center h-dvh">
        <h1>Not found 🙁</h1>
        <Link to="/" className="link">Home ➡️</Link>
      </div>
    ),
    scrollRestoration: true,
  })
  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
