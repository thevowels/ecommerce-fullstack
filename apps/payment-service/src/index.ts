import { serve } from '@hono/node-server'
import { Hono } from 'hono'
const port = 8002
const app = new Hono()

app.get('/', (c) => {
  return c.text('Payment endpoint works!')
})

serve({
  fetch: app.fetch,
  port: port
}, (info) => {
  console.log(`Hono Server is running on http://localhost:${info.port}`)
})
