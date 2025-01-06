import { fallback } from '@tanstack/zod-adapter'
import { z } from 'zod'

export const query = z.object({
  q: fallback(z.string().optional(), ''),
  page: fallback(z.coerce.number().nonnegative().optional(), 1),
})
