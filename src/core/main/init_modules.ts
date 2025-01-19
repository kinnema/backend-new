import fastifyAutoload from "@fastify/autoload";
import scalarPlugin from "@src/plugins/scalar.plugin";
import { FastifyInstance } from "fastify";
import path from "path";
import { BASE_PATH } from "../../main";
import authenticatePlugin from "../../plugins/authenticate.plugin";
import cookiePlugin from "../../plugins/cookie.plugin";
import corsPlugin from "../../plugins/cors.plugin";
import jwtPlugin from "../../plugins/jwt.plugin";

export async function initModules(app: FastifyInstance) {
  await app.register(corsPlugin);
  await app.register(jwtPlugin);
  await app.register(cookiePlugin);
  await app.register(authenticatePlugin);
  await app.register(scalarPlugin);

  await app.register(fastifyAutoload, {
    dir: path.join(BASE_PATH, "features"),
    prefix: "/api",
    encapsulate: true,
    matchFilter(path) {
      return path.endsWith(".feature.ts") || path.endsWith(".feature.js");
    },
  });
}
