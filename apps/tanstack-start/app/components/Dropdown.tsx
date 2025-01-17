import type { PropsWithChildren } from 'react'

export function Dropdown({ children }: PropsWithChildren) {
  return <div className="dropdown">{children}</div>
}

Dropdown.Trigger = function Trigger({ children }: PropsWithChildren) {
  return <div tabIndex={0} role="button" className="btn m-1">{children}</div>
}

Dropdown.List = function List({ children }: PropsWithChildren) {
  return <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">{children}</ul>
}

Dropdown.Item = function Item({ children }: PropsWithChildren) {
  return <li>{children}</li>
}
