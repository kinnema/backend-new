import { FastifyInstance } from "fastify";
import S from "fluent-json-schema";
import {
  lastWatchedCreateSchemaInputType,
  lastWatchedCreateSchemaOutputType,
  lastWatchedPatchSchemaInputType,
  lastWatchedPatchSchemaOutputType,
  lastWatchedSchemaOutputType,
} from "./last_watched.schema";

export function addLastWatchedSchemas(app: FastifyInstance) {
  const commonSchemas = S.object()
    .id("https://kinnema.hasanisabbah.xyz/last_watched")
    .definition("lastWatchedSchemaOutputType", lastWatchedSchemaOutputType)
    .definition(
      "lastWatchedCreateSchemaOutputType",
      lastWatchedCreateSchemaOutputType
    )
    .definition(
      "lastWatchedCreateSchemaInputType",
      lastWatchedCreateSchemaInputType
    )
    .definition(
      "lastWatchedPatchSchemaOutputType",
      lastWatchedPatchSchemaOutputType
    )
    .definition(
      "lastWatchedPatchSchemaInputType",
      lastWatchedPatchSchemaInputType
    );

  app.addSchema(commonSchemas);
  // app.addSchema(lastWatchedSchemaOutputType);

  app.log.info("Initialized last watched schemas");
}
