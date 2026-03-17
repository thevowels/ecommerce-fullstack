import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";
import Fastify from "fastify"
import { shouldBeUser } from "./middleware/authMiddleware.js";
const port = 8001
const fastify = Fastify({
	logger: true
});

fastify.register(clerkPlugin)

fastify.get('/health', async (request, reply) => {
	return ({
		status: "ok",
		uptime: process.uptime(),
		timestamp: Date.now(),
		service: "Order Service",
	})
})

fastify.get('/test', {preHandler: shouldBeUser}, async (request, reply) => {
	return reply.send({
		message: 'User retrieved successfully',
		userId: request.userId,
		order: "Order "
	})
})


const start = async () => {
	try {
		await fastify.listen({ port: port })
		console.log("Order service is running on port 8001")
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

start()