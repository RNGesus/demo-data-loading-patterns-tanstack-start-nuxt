import * as z from 'zod'

export const query = z.object({
  country: z.string().default('').catch(''),
})
