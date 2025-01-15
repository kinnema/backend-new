import { lastWatchedCreateHandler } from "@src/controllers/last_watched/last_watched_create.handler";
import lastWatchedGetHandler from "@src/controllers/last_watched/last_watched_get.handler";
import lastWatchedPatchHandler from "@src/controllers/last_watched/last_watched_patch.handler";
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

  app.get(
    "/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "last watched id",
            },
          },
        },
        response: {
          200: $appSchemas("lastWatchedSchemaOutput"),
        },
      },
      preHandler: [app.authenticate],
    },
    lastWatchedGetHandler
  );

  app.post(
    "/",
    {
      schema: {
        body: $appSchemas("lastWatchedCreateSchemaInput"),
        response: {
          200: $appSchemas("lastWatchedCreateSchemaOutput"),
        },
      },
      preHandler: [app.authenticate],
    },
    lastWatchedCreateHandler
  );

  app.patch(
    "/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "last watched id",
            },
          },
        },
        body: $appSchemas("lastWatchedPatchSchemaInput"),
        response: {
          200: {
            type: "object",
            $ref: $appSchemas("lastWatchedPatchSchemaOutput").$ref,
          },
        },
      },
      preHandler: [app.authenticate],
    },
    lastWatchedPatchHandler
  );
}

export const autoPrefix = "/api/last_watched";
