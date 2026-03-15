import type { PropsWithChildren } from 'react'

export function PageHeading({ children }: PropsWithChildren) {
  return <h1 className="mt-2 mb-3 text-2xl font-bold">{children}</h1>
}
