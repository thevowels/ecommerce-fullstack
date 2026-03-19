import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import {
  clerkClient,
  clerkMiddleware,
  getAuth,
  requireAuth,
} from "@clerk/express";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";
const app = express();
const port = 8000;
app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);


app.use(clerkMiddleware());
app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.log(err);
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error" });
});

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    name: "product service",
  });
});

app.get("/test", shouldBeUser, async (req, res) => {
  return res.json({
    message: "Authenticated",
    userId: req.userId,
    product: "Product ",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
