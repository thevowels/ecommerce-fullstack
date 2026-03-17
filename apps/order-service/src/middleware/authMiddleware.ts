import { getAuth } from "@clerk/fastify"
import { FastifyRequest, FastifyReply } from "fastify"

declare module "fastify" {
    export interface FastifyRequest {
        userId?: string;
    }
}

export const shouldBeUser = async(req: FastifyRequest, reply: FastifyReply) => {
    const auth = getAuth(req);
    if (!auth.userId) {
        return reply.send({ message: "You are not logged in " });
    }
    req.userId = auth.userId;
    
    return;
}