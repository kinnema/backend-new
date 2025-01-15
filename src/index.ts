import fCookie from "@fastify/cookie";
import fjwt from "@fastify/jwt";
import "dotenv/config";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { authRoutes } from "./routes/auth.routes";
import { registerAuthSchemas } from "./validators/auth";

export const app = fastify();

app.register(fjwt, {
  secret: process.env.JWT_SECRET || "some-secret-key",
});
app.register(fCookie, {
  secret: process.env.COOKIE_SECRET || "some-secret-key",
  hook: "preHandler",
});

app.addHook("preHandler", (req, _res, next) => {
  // here we are
  req.jwt = app.jwt;
  return next();
});

app.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.cookies.access_token;

    if (!token) {
      return reply.status(401).send({ message: "Authentication required" });
    }

    const decoded = request.jwt.verify(token);
    request.user = decoded;
  }
);

registerAuthSchemas();
app.register(authRoutes, { prefix: "/api/auth" });

const start = async () => {
  try {
    await app.listen({
      port: 8000,
    });
    console.log("Server running at http://localhost:8000/");
  } catch (err) {
    app.log.error(err);
    console.error(err);
    process.exit(1);
  }
};

start();
