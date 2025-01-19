import { fallback } from '@tanstack/zod-adapter'
import { z } from 'zod'

export const query = z.object({
  country: fallback(z.string(), '').default(''),
})
