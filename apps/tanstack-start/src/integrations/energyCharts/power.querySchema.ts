import { fallback } from '@tanstack/zod-adapter'
import * as z from 'zod'

export const query = z.object({
  country: fallback(z.string(), '').default(''),
})
