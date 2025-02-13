import type { InjectionKey, StyleValue } from 'vue'

// TODO: declare types once
export const listInjectionKey: InjectionKey<{
  id: string
  style: StyleValue
}> = Symbol('listInjectionKey')

export const buttonInjectionKey: InjectionKey<{
  popoverTarget: string
  style: StyleValue
}> = Symbol('buttonInjectionKey')
