import express, { Request, Response } from "express";
import cors from "cors";
import { clerkClient, clerkMiddleware, getAuth, requireAuth } from "@clerk/express";
import { shouldBeUser } from "./middleware/authMiddleware.js";

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
app.get('/test', shouldBeUser, async (req, res) => {
  return res.json({ message: "Authenticated", userId: req.userId, product: "Product " })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
