import type { z } from 'vinxi'
import type { schemas } from './client'

export type AppType = ProviderApp['type']
export type ProviderApp = z.infer<typeof schemas.ProviderApp>
export type Country = z.infer<typeof schemas.Country>
