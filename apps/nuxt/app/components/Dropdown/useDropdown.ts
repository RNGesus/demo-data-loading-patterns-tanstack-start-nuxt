import type { StyleValue } from 'vue'

export function useDropdown() {
  const popoverId = useId()
  const anchorId = useId()
  const anchorName = `--${anchorId}`

  return {
    buttonProps: {
      popoverTarget: popoverId,
      // @ts-expect-error -- anchorName is not in CSSStyleDeclaration yet
      style: { anchorName } satisfies StyleValue,
    },
    listProps: {
      id: popoverId,
      // @ts-expect-error -- positionAnchor is not in CSSStyleDeclaration yet
      style: { positionAnchor: anchorName } satisfies StyleValue,
    },
  }
}
