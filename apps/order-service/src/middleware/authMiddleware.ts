import { getAuth } from "@clerk/fastify";
import { FastifyRequest, FastifyReply } from "fastify";
import type {CustomJWTSessionClaims} from "@repo/types"
declare module "fastify" {
  export interface FastifyRequest {
    userId?: string;
  }
}

export const shouldBeUser = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const auth = getAuth(req);
  if (!auth.userId) {
    return reply.status(401).send({ message: "You are not logged in " });
  }
  req.userId = auth.userId;

  return;
};

export const shouldBeAdmin = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const auth = getAuth(req);
  if (!auth.userId) {
    return reply.status(401).send({ message: "You are not logged in " });
  }
  const claims = auth.sessionClaims as CustomJWTSessionClaims;

  if (claims.metadata?.role !== "admin")
    return reply
      .status(403)
      .send({ message: "You are not authorized to do this action!" });
  req.userId = auth.userId;

  return;
};
