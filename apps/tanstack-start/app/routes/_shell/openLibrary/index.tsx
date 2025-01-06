import { query } from '@app/openLibrary/search.querySchema'
import { searchServerFn } from '@app/openLibrary/search.serverFn'
import { unwrapFormData } from '@project/helpers/form'
import { createFileRoute, Link, linkOptions } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'

export const Route = createFileRoute('/_shell/openLibrary/')({
  component: RouteComponent,
  validateSearch: zodValidator(query),
  loaderDeps: ({ search: { page, q } }) => ({ page, q }),
  loader: async ({ deps }) =>
    await searchServerFn({ data: { page: deps.page, q: deps.q } }),
})

function RouteComponent() {
  const navigateTo = Route.useNavigate()
  const search = Route.useLoaderDeps()
  const results = Route.useLoaderData()

  return (
    <div>
      <code>⚠️ same page navigation does not work right now and will trigger a full page load ⚠️</code>
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
          <span role="img" aria-label="Search">🔍</span>
          <input
            type="search"
            name="q"
            defaultValue={search.q || ''}
            className="grow"
          />
        </label>
        <input type="hidden" name="page" value={search.page || ''} />
      </form>
      <nav>
        <ul className="menu menu-horizontal bg-base-300">
          {[1, 2, 3].map(i => (
            <li key={i}>
              <Link
                from={Route.fullPath}
                to="."
                search={{ q: search.q ?? undefined, page: i > 1 ? i : undefined }}
                // FIXME: sadly this does not work properly for the first page
                // activeProps={{ className: 'menu-active' }}
                className={
                  search.page === i || (!search.page && i === 1)
                    ? 'menu-active'
                    : ''
                }
              >
                page
                {' '}
                {i}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  )
}
