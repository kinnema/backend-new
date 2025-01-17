import { loginHandler } from "@src/controllers/auth/login/login.handler";
import { logoutHandler } from "@src/controllers/auth/login/logout.handler";
import { registerHandler } from "@src/controllers/auth/login/register.handler";
import {
  LoginUserInputType,
  LoginUserOutputType,
} from "@src/features/auth/schemas/auth/login.schema";
import { CreateUserInputType } from "@src/features/auth/schemas/auth/register.schema";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function initializeAuthRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      preHandler: [app.authenticate],
    },
    (_req: FastifyRequest, reply: FastifyReply) => {
      reply.send({ message: "/ route hit" });
    }
  );
  app.post(
    "/register",
    {
      schema: {
        body: CreateUserInputType,
        response: {
          204: {},
        },
      },
    },
    registerHandler
  ),
    app.post(
      "/login",
      {
        schema: {
          body: LoginUserInputType,
          response: {
            200: LoginUserOutputType,
          },
        },
      },
      loginHandler
    );
  app.delete("/logout", logoutHandler);
}
