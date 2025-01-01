import type { z } from 'zod'
import type { schemas } from './generated/client'

export type AppType = ProviderApp['type']
export type ProviderApp = z.infer<typeof schemas.ProviderApp>
export type Country = z.infer<typeof schemas.Country>
