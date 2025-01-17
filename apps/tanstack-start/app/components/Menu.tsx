import type { PropsWithChildren } from 'react'

export function Menu({ children }: PropsWithChildren) {
  return <details>{children}</details>
}

Menu.Trigger = function Trigger({ children }: PropsWithChildren) {
  return <summary className="flex gap-2">{children}</summary>
}

Menu.List = function List({ children }: PropsWithChildren) {
  return (
    <ul className="bg-base-200 rounded-t-none p-2 z-[1]">
      {children}
    </ul>
  )
}

Menu.Item = function Item({ children }: PropsWithChildren) {
  return (
    <li>
      {children}

    </li>
  )
}
