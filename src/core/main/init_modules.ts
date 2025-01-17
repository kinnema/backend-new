import fastifyAutoload from "@fastify/autoload";
import fCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fjwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";
import path from "path";
import { BASE_PATH } from "../../main";

export async function initModules(app: FastifyInstance) {
  await app.register(cors, {
    origin: true,
    credentials: true,
  });
  await app.register(fjwt, {
    secret: process.env.JWT_SECRET || "some-secret-key",
  });
  await app.register(fCookie, {
    secret: process.env.COOKIE_SECRET || "some-secret-key",
    hook: "preHandler",
  });
  await app.register(fastifyAutoload, {
    dir: path.join(BASE_PATH, "features"),
    prefix: "/api",
    encapsulate: true,
    matchFilter(path) {
      return path.endsWith(".feature.ts") || path.endsWith(".feature.js");
    },
  });
}

export async function initDevModules(app: FastifyInstance) {
  if (process.env.NODE_ENV !== "development") return;

  const scalarModule = await import("@scalar/fastify-api-reference");
  const swaggerModule = await import("@fastify/swagger");

  await app.register(swaggerModule.default, {
    openapi: {
      info: {
        title: "Kinnema",
        version: "1.0.0",
      },
    },
  });

  await app.register(scalarModule.default, {
    routePrefix: "/reference",
    hooks: {
      onRequest: function (_request, _reply, done) {
        done();
      },
      preHandler: function (_request, _reply, done) {
        done();
      },
    },
  });

  // await app.register(swaggerUiModule.default, {
  //   routePrefix: "/docs",
  //   uiConfig: {
  //     docExpansion: "full",
  //     deepLinking: false,
  //   },
  //   staticCSP: true,
  //   transformStaticCSP: (header) => header,
  //   transformSpecification: (swaggerObject, _request, _reply) => {
  //     return swaggerObject;
  //   },
  //   transformSpecificationClone: true,
  // });
}
