import { FastifyInstance } from "fastify";
import S from "fluent-json-schema";

export const favoriteSchemaOutputType = S.object()
  .prop("id", S.string().format("uuid").required())
  .prop("name", S.string().required())
  .prop("poster_path", S.string().required())
  .prop("tmdbId", S.number().required())
  .prop("userId", S.string().required())
  .prop("createdAt", S.string().format("date-time").required());

export type FavoriteOutput = {
  id: string;
  name: string;
  poster_path: string;
  tmdbId: number;
  userId: string;
  createdAt: string;
};

export const favoriteCreateSchemaInputType = S.object()
  .prop("name", S.string().required())
  .prop("poster_path", S.string().required())
  .prop("tmdbId", S.number().required());

export type FavoriteCreateInput = {
  name: string;
  poster_path: string;
  tmdbId: number;
};

export function addFavoriteSchemas(app: FastifyInstance) {
  const commonSchemas = S.object()
    .id(`${process.env.SCHEMA_REF_URL}/favorite`)
    .definition("favoriteSchemaOutputType", favoriteSchemaOutputType)
    .definition("favoriteCreateSchemaInputType", favoriteCreateSchemaInputType);

  app.addSchema(commonSchemas);
  app.log.info("Initialized favorite schemas");
}
