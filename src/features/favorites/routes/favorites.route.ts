import { favoritesCreateHandler } from "@src/controllers/favorites/favorites_create.handler";
import { favoritesDeleteHandler } from "@src/controllers/favorites/favorites_delete.handler";
import { favoritesGetHandler } from "@src/controllers/favorites/favorites_get.handler";
import { FastifyInstance } from "fastify";
import S from "fluent-json-schema";
import {
    favoriteCreateSchemaInputType,
    favoriteSchemaOutputType,
} from "../schemas/favorites.schema";

export default function initializeFavoritesRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: {
        response: {
          200: S.array().items(favoriteSchemaOutputType),
        },
      },
      preHandler: [app.authenticate],
    },
    favoritesGetHandler
  );

  app.post(
    "/",
    {
      schema: {
        body: favoriteCreateSchemaInputType,
        response: {
          200: favoriteSchemaOutputType,
        },
      },
      preHandler: [app.authenticate],
    },
    favoritesCreateHandler
  );

  app.delete(
    "/:id",
    {
      schema: {
        params: S.object().prop("id", S.string().format("uuid")),
        response: {
          200: favoriteSchemaOutputType,
        },
      },
      preHandler: [app.authenticate],
    },
    favoritesDeleteHandler
  );
} 