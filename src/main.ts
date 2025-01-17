import { User } from "@prisma/client";
import "dotenv/config";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import { initDevModules, initModules } from "./core/main/init_modules";

export const BASE_PATH = path.join(__dirname);

const app = fastify({
  logger: true,
});

app.addHook("preHandler", (req, _res, next) => {
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
    request.user = decoded as User;
  }
);

initModules(app);
initDevModules(app);

app.get("/openapi.json", async () => {
  return app.swagger();
});

const start = async () => {
  try {
    await app.ready();
    await app.listen({
      port: 8000,
    });
    app.swagger();
    app.log.info("Server running at http://localhost:8000/");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
