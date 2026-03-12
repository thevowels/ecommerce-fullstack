import express, { Request, Response } from "express"
import cors from "cors"
const app = express()
const port = 8000

app.use(cors({
	origin: ['http://localhost:3000']
}))

app.get('/health', (req: Request, res: Response) => {
  res.json({
	status: "ok",
	uptime: process.uptime(),
	timestamp: Date.now()
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
