import { JWT } from "@fastify/jwt";
import { UserSchema } from "./schemas/user.schema";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }

  interface FastifyInstance {
    authenticate: any;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: UserSchema;
  }
}
