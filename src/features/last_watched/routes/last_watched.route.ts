import { lastWatchedCreateHandler } from "@src/controllers/last_watched/last_watched_create.handler";
import lastWatchedGetHandler from "@src/controllers/last_watched/last_watched_get.handler";
import lastWatchedPatchHandler from "@src/controllers/last_watched/last_watched_patch.handler";
import { lastWatchedRootHandler } from "@src/controllers/last_watched/last_watched_root.handler";
import { FastifyInstance } from "fastify";
import S from "fluent-json-schema";
import {
  lastWatchedCreateSchemaInputType,
  lastWatchedCreateSchemaOutputType,
  lastWatchedPatchSchemaInputType,
  lastWatchedPatchSchemaOutputType,
  lastWatchedSchemaOutputType,
} from "../schemas/last_watched.schema";

export default function initializeLastWatchesRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: {
        response: {
          200: S.array().items(lastWatchedSchemaOutputType),
        },
      },
      preHandler: [app.authenticate],
    },
    lastWatchedRootHandler
  );

  app.get(
    "/:tmdbId",
    {
      schema: {
        params: S.object().prop("tmdbId", S.number().required()),
        response: {
          200: lastWatchedSchemaOutputType,
          404: S.object().prop("error", S.string().required()),
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
        body: lastWatchedCreateSchemaInputType,
        response: {
          200: lastWatchedCreateSchemaOutputType,
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
        params: S.object().prop("id", S.string().format("uuid")),
        body: lastWatchedPatchSchemaInputType,
        response: {
          200: lastWatchedPatchSchemaOutputType,
        },
      },
      preHandler: [app.authenticate],
    },
    lastWatchedPatchHandler
  );
}
