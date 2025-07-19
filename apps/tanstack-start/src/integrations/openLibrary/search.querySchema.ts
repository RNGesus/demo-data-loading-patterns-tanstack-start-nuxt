import { fallback } from '@tanstack/zod-adapter'
import { z } from 'zod'

export const query = z.object({
  q: fallback(z.string(), '').default(''),
  page: fallback(z.coerce.number().nonnegative(), 1).default(1),
})
