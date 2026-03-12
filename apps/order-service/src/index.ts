import Fastify from "fastify"
const port = 8001
const fastify = Fastify({
	logger: true
});

fastify.get('/', async (request,reply) =>  {
	return({order: "service"})
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