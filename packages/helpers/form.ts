import { z } from 'zod'

const cleanedFormDataEntrySchema = z.union([
  z.tuple([z.literal('page'), z.coerce.number().min(2)]),
  z.tuple([z.string().min(1), z.string().min(1)]),
])

export function unwrapFormData<E extends EventTarget | null>(eventTarget: E) {
  if (!(eventTarget instanceof HTMLFormElement)) {
    return
  }

  const formData = new FormData(eventTarget)

  const cleanedFormDataEntries = Array
    .from(formData)
    .filter(entry => cleanedFormDataEntrySchema.safeParse(entry).success)

  const formDataObject = Object.fromEntries(cleanedFormDataEntries)
  return formDataObject
}
