import express, { Request, Response } from "express";
import cors from "cors";
import { clerkClient, clerkMiddleware, getAuth, requireAuth } from "@clerk/express";

const app = express();
const port = 8000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
	name: "product service"
  });
});
app.get('/test', async (req, res) => {

	const auth = getAuth(req);
	const userId = auth.userId;

	if(!userId) {
		return res.status(401).json({message: "You are not logged in "});
	}
	return res.json({ message: "Authenticated", userId: userId, product: "Product " })
  })
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
