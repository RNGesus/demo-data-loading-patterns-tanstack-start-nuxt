// madness!
export function unwrapFormData<E extends EventTarget | null>(eventTarget: E) {
  if (!(eventTarget instanceof HTMLFormElement)) {
    return
  }

  const formDataEntries = (new FormData(eventTarget)).entries()

  const cleanedFormDataEntries = Array.from(formDataEntries)
    // TODO: fix control flow analysis, which does not work here
    .filter((entry): entry is [string, string] => {
      if (typeof entry[1] !== 'string') {
        return false
      }
      if (entry[0] === 'page' && (!entry[1] || entry[1] === '1')) {
        return false
      }
      return true
    })
  const formDataObject = Object.fromEntries(cleanedFormDataEntries)
  return formDataObject
}
