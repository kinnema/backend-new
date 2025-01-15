import { lastWatchedRootHandler } from "@src/controllers/last_watched/last_watched_root.handler";
import { $appSchemas } from "@src/schemas";
import { FastifyInstance } from "fastify";

export default function (app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: {
        response: {
          200: {
            type: "array",
            items: { $ref: $appSchemas("lastWatchedSchemaOutput").$ref },
            default: [],
          },
        },
      },
      preHandler: [app.authenticate],
    },
    lastWatchedRootHandler
  );

  app.put(
    "/",
    {
      schema: {
        body: $appSchemas("lastWatchedSchemaInput"),
        response: {
          200: {
            type: "array",
            items: { $ref: $appSchemas("lastWatchedSchemaOutput").$ref },
            default: [],
          },
        },
      },
      preHandler: [app.authenticate],
    },
    lastWatchedRootHandler
  );
}

export const autoPrefix = "/api/last_watched";
