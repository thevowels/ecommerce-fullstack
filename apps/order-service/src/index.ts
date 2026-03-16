import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";
import Fastify from "fastify"
const port = 8001
const fastify = Fastify({
	logger: true
});

fastify.register(clerkPlugin)

fastify.get('/health', async (request,reply) =>  {
	return({
		status: "ok",
		uptime: process.uptime(),
		timestamp: Date.now(),
	})
})

fastify.get('/test', async (request, reply) => {
	try {
	  // Use `getAuth()` to access `isAuthenticated` and the user's ID
	  const { isAuthenticated, userId } = getAuth(request)
  
	  // If user isn't authenticated, return a 401 error
	  if (!isAuthenticated) {
		return reply.code(401).send({ error: 'User not authenticated' })
	  }
  
	  // Use `clerkClient` to access Clerk's JS Backend SDK methods
	  // and get the user's User object
	  const user = await clerkClient.users.getUser(userId)
  
	  return reply.send({
		message: 'User retrieved successfully',
		user,
		order: "Order "
	  })
	} catch (error) {
	  fastify.log.error(error)
	  return reply.code(500).send({ error: 'Failed to retrieve user' })
	}
  })
  

const start = async() => {
	try{
		await fastify.listen({port: port})
		console.log("Order service is running on port 8001")
	}catch(err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

start()