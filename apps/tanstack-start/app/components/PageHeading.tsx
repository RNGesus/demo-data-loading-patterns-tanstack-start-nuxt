import type { PropsWithChildren } from 'react'

export function PageHeading({ children }: PropsWithChildren) {
  return (
    <h1 className="text-2xl font-bold mt-2 mb-3">
      {children}
    </h1>
  )
}
