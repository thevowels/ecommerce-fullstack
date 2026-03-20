import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import stripe from "./utils/stripe.js";
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

app.get("/test", shouldBeUser, (c) => {
  return c.json({
    message: "You are authenticated!",
    userId: c.get('userId'),
    payment: "Payment",
  });
});

app.post("/create-stripe-product", async (c) =>{
	const res = await stripe.products.create({
		id: "123",
		name: "Test Product",
		default_price_data:{
			currency: "usd",
			unit_amount: 10 * 100

		}
	})

	return c.json(res);

})

app.get("/get-price", async (c) => {
	const res = await stripe.prices.list({
		product:"123"
	});

	return c.json(res);
})

serve(
  {
    fetch: app.fetch,
    port: port,
  },
  (info) => {
    console.log(`Hono Server is running on http://localhost:${info.port}`);
  }
);
