import type { HTMLAttributes, PropsWithChildren } from "react";
import { useRouter } from "@tanstack/react-router";
import { createContext, use, useEffect, useId, useMemo, useRef } from "react";

interface DropdownContextType {
  buttonProps: Pick<
    HTMLAttributes<HTMLButtonElement>,
    "popoverTarget" | "style"
  >;
  listProps: Pick<HTMLAttributes<HTMLUListElement>, "id" | "style"> & {
    keepOpenOnRouteChange?: boolean;
  };
}

const DropdownContext = createContext<DropdownContextType>({
  buttonProps: {},
  listProps: {},
});

export function Dropdown({
  children,
  keepOpenOnRouteChange = false,
}: PropsWithChildren<{ keepOpenOnRouteChange?: boolean }>) {
  const popoverId = useId();
  const anchorId = useId();
  const anchorName = `--${anchorId.replace(/:/g, "")}`;

  const value = useMemo(
    () =>
      ({
        buttonProps: {
          popoverTarget: popoverId,
          style: { anchorName },
        },
        listProps: {
          id: popoverId,
          keepOpenOnRouteChange,
          style: { positionAnchor: anchorName },
        },
      }) satisfies DropdownContextType,
    [popoverId, anchorName, keepOpenOnRouteChange],
  );
  return <DropdownContext value={value}>{children}</DropdownContext>;
}

Dropdown.Trigger = function Trigger({ children }: PropsWithChildren) {
  const { buttonProps } = use(DropdownContext);
  return (
    <button className="btn m-1" type="button" {...buttonProps}>
      {children}
    </button>
  );
};

Dropdown.List = function List({ children }: PropsWithChildren) {
  const {
    listProps: { keepOpenOnRouteChange, ...restListProps },
  } = use(DropdownContext);

  const popoverRef = useRef<HTMLUListElement>(null);

  const route = useRouter();
  useEffect(() => {
    const unsubscribe = route.subscribe("onBeforeNavigate", () => {
      !keepOpenOnRouteChange && popoverRef.current?.hidePopover();
    });
    return unsubscribe;
  }, [keepOpenOnRouteChange, route]);

  return (
    <ul
      ref={popoverRef}
      popover="auto"
      className="dropdown menu bg-base-100 rounded-box z-1 h-[min(500px,60vh)] w-52 overscroll-contain p-2 shadow-sm"
      {...restListProps}
    >
      {children}
    </ul>
  );
};

Dropdown.Item = function Item({ children }: PropsWithChildren) {
  return <li>{children}</li>;
};
