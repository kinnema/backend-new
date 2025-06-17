import { FastifyInstance } from "fastify";
import S from "fluent-json-schema";

export const WatchProvidersSchema = S.object()
  .id("#WatchProvidersSchema")
  .title("WatchProvidersSchema")
  .prop(
    "providers",
    S.array().items(
      S.object()
        .id("#WatchProviderInnerSchema")
        .prop("name", S.string())
        .prop("priority", S.number())
        .prop("isEnabled", S.boolean())
    )
  )
  .required();

export const WatchQueryParamsSchema = S.object()
  .prop("id", S.string())
  .prop("season_number", S.number())
  .prop("episode_number", S.number());

export function addWatchSchemas(app: FastifyInstance) {
  app.addSchema(WatchProvidersSchema);
}

export interface IWatchGetParams {
  id: string;
  season_number: number;
  episode_number: number;
}
