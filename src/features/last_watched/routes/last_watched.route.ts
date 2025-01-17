import { Type } from "@sinclair/typebox";
import { lastWatchedCreateHandler } from "@src/controllers/last_watched/last_watched_create.handler";
import lastWatchedGetHandler from "@src/controllers/last_watched/last_watched_get.handler";
import lastWatchedPatchHandler from "@src/controllers/last_watched/last_watched_patch.handler";
import { FastifyInstance } from "fastify";
import S from "fluent-json-schema";
import {
  lastWatchedCreateSchemaInputType,
  lastWatchedCreateSchemaOutputType,
  lastWatchedPatchSchemaInputType,
  lastWatchedPatchSchemaOutputType,
} from "../schemas/last_watched.schema";

export default function initializeLastWatchesRoutes(app: FastifyInstance) {
  // app.get(
  //   "/",
  //   {
  //     schema: {
  //       response: {
  //         200: {
  //           type: "array",
  //           items: lastWatchedSchemaOutputType,
  //           default: [],
  //         },
  //       },
  //     },
  //     preHandler: [app.authenticate],
  //   },
  //   lastWatchedRootHandler
  // );

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
          200: S.object().ref(
            "https://kinnema.hasanisabbah.xyz/last_watched#/definitions/lastWatchedSchemaOutputType"
          ),
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
        params: Type.Object({
          id: Type.Number(),
        }),
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
