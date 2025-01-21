import S from "fluent-json-schema";

export const WatchProvidersSchema = S.object().prop(
  "providers",
  S.array().items(
    S.object()
      .prop("name", S.string())
      .prop("priority", S.number())
      .prop("isEnabled", S.boolean())
  )
);

export const WatchQueryParamsSchema = S.object()
  .prop("serie_name", S.string())
  .prop("season_number", S.number())
  .prop("episode_number", S.number());

export interface IWatchGetParams {
  serie_name: string;
  season_number: number;
  episode_number: number;
}
