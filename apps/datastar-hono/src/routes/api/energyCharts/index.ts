import { publicPowerPublicPowerGet } from '@project/energy-charts-service/client'
import { Hono } from 'hono'

const energyChartsApi = new Hono()

energyChartsApi.get('/power', async (context) => {
  const country = context.req.query('country')
  if (!country) {
    return context.json({ error: 'country query parameter is required' }, 400)
  }

  try {
    return context.json(
      await publicPowerPublicPowerGet({
        query: { country },
      }),
    )
  } catch (error) {
    return context.json({ error: String(error) }, 502)
  }
})

export { energyChartsApi }
