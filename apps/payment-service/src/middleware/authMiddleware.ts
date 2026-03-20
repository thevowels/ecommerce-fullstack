import { getAuth } from '@hono/clerk-auth';
import { createMiddleware } from 'hono/factory'
import type {CustomJWTSessionClaims} from "@repo/types"
export const shouldBeUser = createMiddleware<{
    Variables:{
        userId: string;
    }
}>(async (c, next) => {

  const auth = getAuth(c);

  if(!auth.userId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  c.set('userId', auth.userId);
  await next();

})

export const shouldBeAdmin = createMiddleware<{
    Variables:{
        userId: string;
    }
}>(async (c, next) => {

  const auth = getAuth(c);

  if(!auth.userId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const claims = auth.sessionClaims as CustomJWTSessionClaims;
  if (claims.metadata?.role !== "admin")
	return c.json({message: " You are not unauthorized"}, 403);
  c.set('userId', auth.userId);
  await next();

})