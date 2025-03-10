import { query } from '@app/integrations/openLibrary/search.querySchema'
import { searchServerFn } from '@app/integrations/openLibrary/search.serverFn'
import { unwrapFormData } from '@project/helpers/form'
import {
  Await,
  createFileRoute,
  Link,
  stripSearchParams,
} from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { Suspense } from 'react'

// TODO: improve choppy loading behavior: shows cached (stale?) results, then the spinner and then the (fresh) results
export const Route = createFileRoute('/_shell/openLibrary/')({
  component: RouteComponent,
  validateSearch: zodValidator(query),
  search: {
    middlewares: [stripSearchParams({ page: 1, q: '' })],
  },
  loaderDeps: ({ search: { page, q } }) => ({ page, q }),
  loader: async ({ deps }) => ({
    promisedResults: searchServerFn({ data: { page: deps.page, q: deps.q } }),
  }),
})

function RouteComponent() {
  const navigateTo = Route.useNavigate()
  const search = Route.useLoaderDeps()
  const { promisedResults } = Route.useLoaderData()

  return (
    <div>
      <div role="alert" className="alert alert-warning alert-soft my-5 w-auto">
        <span>
          ⚠️ same page navigation does not work properly right now and will
          trigger a full page load or always does a page transition ⚠️
        </span>
      </div>
      <form
        onSubmit={async (event) => {
          event.preventDefault()
          event.stopPropagation()

          await navigateTo({
            search: unwrapFormData(event.target),
          })
        }}
      >
        <label className="input input-bordered flex items-center gap-2">
          <span role="img" aria-label="Search">
            🔍
          </span>
          <input
            type="search"
            name="q"
            defaultValue={search.q}
            className="grow"
          />
          <kbd className="kbd kbd-sm">Enter</kbd>
        </label>
        <input type="hidden" name="page" value={1} />
      </form>
      <nav>
        <ul className="menu menu-horizontal bg-base-300">
          {[1, 2, 3].map(i => (
            <li key={i}>
              <Link
                from={Route.fullPath}
                to="."
                search={{ q: search.q, page: i }}
                // FIXME: sadly this does not work properly for the first page
                // activeProps={{ className: 'menu-active' }}
                className={search.page === i ? 'menu-active' : ''}
              >
                {`page ${i}`}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Suspense>
        <Await promise={promisedResults}>
          {results => <pre>{JSON.stringify(results, null, 2)}</pre>}
        </Await>
      </Suspense>
    </div>
  )
}
