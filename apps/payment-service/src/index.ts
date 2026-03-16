import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
const port = 8002;
const app = new Hono();

app.use("*", clerkMiddleware());

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/test", (c) => {
  const { userId } = getAuth(c);

  if (!userId)
    return c.json({
      message: "You are not logged in.",
    });
  return c.json({
    message: "You are authenticated!",
    userId,
    payment: "Payment",
  });
});

serve(
  {
    fetch: app.fetch,
    port: port,
  },
  (info) => {
    console.log(`Hono Server is running on http://localhost:${info.port}`);
  }
);
