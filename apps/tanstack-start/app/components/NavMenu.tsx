import type { PropsWithChildren } from 'react'

export function NavMenu({ children }: PropsWithChildren) {
  return <details>{children}</details>
}

NavMenu.Trigger = function Trigger({ children }: PropsWithChildren) {
  return <summary className="flex gap-2">{children}</summary>
}

NavMenu.List = function List({ children }: PropsWithChildren) {
  return (
    <ul className="bg-base-200 rounded-t-none p-2 z-[1]">
      {children}
    </ul>
  )
}

NavMenu.Item = function Item({ children }: PropsWithChildren) {
  return (
    <li>
      {children}
    </li>
  )
}
