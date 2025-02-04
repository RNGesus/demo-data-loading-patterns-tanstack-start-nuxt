import { z } from 'zod'

const cleanedFormDataEntriesSchema = z.union([
  z.tuple([z.literal('page'), z.coerce.number().min(2)]),
  z.tuple([z.string().min(1), z.string().min(1)]),
]).catch(['', '']).array().transform(entries => entries.filter(([key]) => !!key))

export function unwrapFormData<E extends EventTarget | null>(eventTarget: E) {
  if (!(eventTarget instanceof HTMLFormElement)) {
    return
  }

  const formData = new FormData(eventTarget)

  const parsedFormDataEntries = cleanedFormDataEntriesSchema.safeParse(Array.from(formData))
  if (!parsedFormDataEntries.success) {
    return
  }
  const formDataObject = Object.fromEntries(parsedFormDataEntries.data)
  return formDataObject
}
