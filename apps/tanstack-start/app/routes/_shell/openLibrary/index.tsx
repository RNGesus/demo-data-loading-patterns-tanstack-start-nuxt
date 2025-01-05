import { query, searchServerFn } from '@app/openLibrary/search.serverFn'
import { unwrapFormData } from '@project/helpers/form'
import { createFileRoute, Link } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'

export const Route = createFileRoute('/_shell/openLibrary/')({
  component: RouteComponent,
  // FIXME: will lead to an error with the 'resolve' package -> wait for fix or find solution
  // validateSearch: zodValidator(query),
  /**  @ts-expect-error -- needs 'validateSearch' method  */
  loaderDeps: ({ search: { page, q } }) => ({ page, q }),
  loader: async () =>
    await searchServerFn({ data: { page: 1, q: '' } }),
  // loader: async ({ deps }) =>
  // await searchServerFn({ data: { page: deps.page, q: deps.q } }),
})

function RouteComponent() {
  const navigateTo = Route.useNavigate()
  const search = Route.useLoaderDeps()
  const results = Route.useLoaderData()

  return (
    <div>
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
          <span className="sr-only">Search</span>
          <span aria-hidden>🔍</span>
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
                to="/openLibrary"
                search={{ ...search, page: i > 1 ? i : undefined }}
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
