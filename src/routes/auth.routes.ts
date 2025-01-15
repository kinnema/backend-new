import { loginHandler } from "@src/controllers/auth/login/login.handler";
import { logoutHandler } from "@src/controllers/auth/login/logout.handler";
import { registerHandler } from "@src/controllers/auth/login/register.handler";
import { $appSchemas } from "@src/schemas";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function authRoutes(app: FastifyInstance) {
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
        body: $appSchemas("registerSchema"),
        response: {
          201: $appSchemas("createUserResponseSchema"),
        },
      },
    },
    registerHandler
  ),
    app.post(
      "/login",
      {
        schema: {
          body: {
            $ref: $appSchemas("loginSchema").$ref,
          },
          response: {
            200: $appSchemas("loginSchemaOutput"),
          },
        },
      },
      loginHandler
    );
  app.delete("/logout", logoutHandler);
  app.log.info("user routes registered");
}
