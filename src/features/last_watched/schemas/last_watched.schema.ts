import { LastWatched } from "@prisma/client";
import S from "fluent-json-schema";
import { UserSchema } from "../../auth/schemas/user.schema";

const Nullable = (
  schema: ReturnType<typeof S.string | typeof S.boolean | typeof S.number>
) => schema.raw({ nullable: true });

const UndefinedOr = (
  schema: ReturnType<typeof S.string | typeof S.boolean | typeof S.number>
) => schema.raw({ nullable: true, required: false });

const lastWatchedBaseSchema = S.object()
  .id("#lastWatchedBaseSchema")
  .title("lastWatchedBaseSchema")
  .prop("id", S.string().format("uuid").required())
  .prop("name", S.string().required())
  .prop("poster_path", S.string().required())
  .prop("season", S.number().required())
  .prop("episode", S.number().required())
  .prop("isWatched", Nullable(S.boolean()))
  .prop("tmdbId", S.number().required())
  .prop("atSecond", S.number().required())
  .prop("totalSeconds", S.number().required())
  .prop("episode_name", S.string().required())
  .prop("network", S.number().required())
  .prop("userId", S.string().format("uuid").required());

export const lastWatchedSchemaOutputType = S.object()
  .id("#lastWatchedSchemaOutputType")
  .title("lastWatchedSchemaOutputType")
  .prop("user", UserSchema)
  .extend(lastWatchedBaseSchema);

export const lastWatchedCreateSchemaOutputType = S.object()
  .id("#lastWatchedCreateSchemaOutputType")
  .title("lastWatchedCreateSchemaOutputType")
  .extend(lastWatchedBaseSchema);

export const lastWatchedCreateSchemaInputType = S.object()
  .id("#lastWatchedCreateSchemaInputType")
  .title("lastWatchedCreateSchemaInputType")
  .prop("tmdbId", S.number().required())
  .prop("name", S.string().required())
  .prop("poster_path", S.string().required())
  .prop("season", S.number().required())
  .prop("episode", S.number().required())
  .prop("isWatched", Nullable(S.boolean()))
  .prop("atSecond", S.number().required())
  .prop("totalSeconds", S.number().required())
  .prop("episode_name", S.string().required())
  .prop("network", S.number().required());

export const lastWatchedPatchSchemaOutputType = S.object()
  .id("#lastWatchedPatchSchemaOutputType")
  .title("lastWatchedPatchSchemaOutputType")
  .extend(lastWatchedBaseSchema);

export const lastWatchedPatchSchemaInputType = S.object()
  .id("#lastWatchedPatchSchemaInputType")
  .title("lastWatchedPatchSchemaInputType")
  .prop("season", UndefinedOr(S.number()))
  .prop("episode", UndefinedOr(S.number()))
  .prop("isWatched", UndefinedOr(S.boolean()))
  .prop("atSecond", UndefinedOr(S.number()));

// Define TypeScript types manually
export type LastWatchedCreateInput = Omit<LastWatched, "id" | "user">;

export type LastWatchedCreateOutput = Omit<LastWatched, "user">;

export type LastWatchedPatchInput = Pick<
  LastWatched,
  "season" | "episode" | "atSecond" | "isWatched"
>;

export type LastWatchedPatchOutput = Omit<LastWatched, "user">;
