import * as z from 'zod'

export const query = z.object({
  q: z.string().default('').catch(''),
  page: z.coerce.number().nonnegative().default(1).catch(1),
})
