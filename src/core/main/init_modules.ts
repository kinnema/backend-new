import fastifyAutoload from "@fastify/autoload";
import fCookie from "@fastify/cookie";
import fjwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";
import path from "path";
import { BASE_PATH } from "../../main";

export async function initModules(app: FastifyInstance) {
  await app.register(fjwt, {
    secret: process.env.JWT_SECRET || "some-secret-key",
  });
  await app.register(fCookie, {
    secret: process.env.COOKIE_SECRET || "some-secret-key",
    hook: "preHandler",
  });
  await app.register(fastifyAutoload, {
    dir: path.join(BASE_PATH, "routes"),
    matchFilter: (filePath) =>
      filePath.endsWith(".route.js") || filePath.endsWith(".route.ts"),
    prefix: "/api",
  });
}

export async function initDevModules(app: FastifyInstance) {
  const swaggerUiModule = await import("@fastify/swagger-ui");
  const swaggerModule = await import("@fastify/swagger");

  await app.register(swaggerModule.default, {
    openapi: {
      info: {
        title: "Kinnema",
        version: "1.0.0",
      },
    },
  });

  await app.register(swaggerUiModule.default, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, _request, _reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });
}
