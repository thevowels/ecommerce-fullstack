import { serve } from '@hono/node-server'
import { Hono } from 'hono'
const port = 8002
const app = new Hono()

app.get('/health', (c) => {
  return c.json({
	status: "ok",
	uptime: process.uptime(),
	timestamp: Date.now()
  })
})

serve({
  fetch: app.fetch,
  port: port
}, (info) => {
  console.log(`Hono Server is running on http://localhost:${info.port}`)
})
