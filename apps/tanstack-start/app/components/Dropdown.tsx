import type { HTMLAttributes, PropsWithChildren } from 'react'
import { useRouter } from '@tanstack/react-router'
import { createContext, use, useEffect, useId, useMemo, useRef } from 'react'

interface DropdownContextType {
  buttonProps: Pick<HTMLAttributes<HTMLButtonElement>, 'popoverTarget' | 'style'>
  listProps: Pick<HTMLAttributes<HTMLUListElement>, 'id' | 'style'> & { keepOpenOnRouteChange?: boolean }
}

const DropdownContext = createContext<DropdownContextType>({
  buttonProps: {},
  listProps: {},
})

export function Dropdown({ children, keepOpenOnRouteChange = false }: PropsWithChildren<{ keepOpenOnRouteChange?: boolean }>) {
  const popoverId = useId()
  const anchorId = useId()
  const anchorName = `--${anchorId.replace(/:/g, '')}`

  const value = useMemo(() => ({
    buttonProps: {
      popoverTarget: popoverId,
      // @ts-expect-error -- anchorName is not in csstype yet, see https://www.npmjs.com/package/csstype
      style: { anchorName },
    },
    listProps: {
      id: popoverId,
      keepOpenOnRouteChange,
      // @ts-expect-error -- positionAnchor is not in csstype yet, see https://www.npmjs.com/package/csstype
      style: { positionAnchor: anchorName },

    },
  } satisfies DropdownContextType), [popoverId, anchorName, keepOpenOnRouteChange])
  // @ts-expect-error -- anchorName and positionAnchor are not in csstype yet
  return <DropdownContext value={value}>{children}</DropdownContext>
}

Dropdown.Trigger = function Trigger({ children }: PropsWithChildren) {
  const { buttonProps } = use(DropdownContext)
  return (
    <button
      className="btn m-1"
      type="button"
      {...buttonProps}
    >
      {children}
    </button>
  )
}

Dropdown.List = function List({ children }: PropsWithChildren) {
  const { listProps: { keepOpenOnRouteChange, ...restListProps } } = use(DropdownContext)

  const popoverRef = useRef<HTMLUListElement>(null)

  const route = useRouter()
  useEffect(() => {
    const unsubscribe = route.subscribe('onBeforeNavigate', () => {
      !keepOpenOnRouteChange && popoverRef.current?.hidePopover()
    })
    return unsubscribe
  }, [keepOpenOnRouteChange, route])

  return (
    <ul
      ref={popoverRef}
      popover="auto"
      className="dropdown menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm h-[min(500px,60vh)] overscroll-contain"
      {...restListProps}
    >
      {children}
    </ul>
  )
}

Dropdown.Item = function Item({ children }: PropsWithChildren) {
  return <li>{children}</li>
}
