import S from "fluent-json-schema";
import { UserSchema } from "../../auth/schemas/user.schema";

const Nullable = (
  schema: ReturnType<typeof S.string | typeof S.boolean | typeof S.number>
) => schema.raw({ nullable: true });

const UndefinedOr = (
  schema: ReturnType<typeof S.string | typeof S.boolean | typeof S.number>
) => schema.raw({ nullable: true, required: false });

export const lastWatchedSchemaOutputType = S.object()
  .id("#lastWatchedSchemaOutputType")
  .title("lastWatchedSchemaOutputType")
  .prop("id", S.string().format("uuid").required())
  .prop("season", S.number().required())
  .prop("episode", S.number().required())
  .prop("isWatched", Nullable(S.boolean()))
  .prop("tmdbId", S.string().required())
  .prop("userId", S.string().format("uuid").required())
  .prop("user", UserSchema)
  .prop("atSecond", S.number().required());

export const lastWatchedCreateSchemaOutputType = S.object()
  .id("#lastWatchedCreateSchemaOutputType")
  .title("lastWatchedCreateSchemaOutputType")
  .prop("id", S.string().format("uuid").required())
  .prop("season", S.number().required())
  .prop("episode", S.number().required())
  .prop("isWatched", Nullable(S.boolean()))
  .prop("tmdbId", S.string().required())
  .prop("userId", S.string().format("uuid").required())
  .prop("atSecond", S.number().required());

export const lastWatchedCreateSchemaInputType = S.object()
  .id("#lastWatchedCreateSchemaInputType")
  .title("lastWatchedCreateSchemaInputType")
  .prop("season", S.number().required())
  .prop("episode", S.number().required())
  .prop("isWatched", Nullable(S.boolean()))
  .prop("tmdbId", S.string().required())
  .prop("userId", S.string().format("uuid").required())
  .prop("atSecond", S.number().required());

export const lastWatchedPatchSchemaOutputType = S.object()
  .id("#lastWatchedPatchSchemaOutputType")
  .title("lastWatchedPatchSchemaOutputType")
  .prop("id", S.string().format("uuid").required())
  .prop("season", S.number().required())
  .prop("episode", S.number().required())
  .prop("isWatched", Nullable(S.boolean()))
  .prop("tmdbId", S.string().required())
  .prop("userId", S.string().format("uuid").required())
  .prop("atSecond", S.number().required());

export const lastWatchedPatchSchemaInputType = S.object()
  .id("#lastWatchedPatchSchemaInputType")
  .title("lastWatchedPatchSchemaInputType")
  .prop("season", UndefinedOr(S.number()))
  .prop("episode", UndefinedOr(S.number()))
  .prop("isWatched", UndefinedOr(S.boolean()))
  .prop("tmdbId", UndefinedOr(S.string()))
  .prop("userId", UndefinedOr(S.string().format("uuid")))
  .prop("atSecond", UndefinedOr(S.number()));

// Define TypeScript types manually
export type LastWatchedCreateInput = {
  season: number;
  episode: number;
  isWatched: boolean | null;
  tmdbId: string;
  userId: string;
  atSecond: number;
};

export type LastWatchedCreateOutput = {
  id: string;
  season: number;
  episode: number;
  isWatched: boolean | null;
  tmdbId: string;
  userId: string;
  atSecond: number;
};

export type LastWatchedPatchInput = {
  season?: number;
  episode?: number;
  isWatched?: boolean | null;
  tmdbId?: string;
  userId?: string;
  atSecond?: number;
};

export type LastWatchedPatchOutput = {
  id: string;
  season: number;
  episode: number;
  isWatched: boolean | null;
  tmdbId: string;
  userId: string;
  atSecond: number;
};
