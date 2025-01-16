import { Static, Type } from "@sinclair/typebox";
import { Nullable, UndefinedOr } from "@src/types";
import { UserSchema } from "../../auth/schemas/user.schema";

export const lastWatchedSchemaOutputType = Type.Object({
  id: Type.String({ format: "uuid" }),
  season: Type.Number(),
  episode: Type.Number(),
  isWatched: Nullable(Type.Boolean()),
  tmdbId: Type.String(),
  userId: Type.String({ format: "uuid" }),
  user: UserSchema,
  atSecond: Type.Number(),
});

export const lastWatchedCreateSchemaOutputType = Type.Object({
  id: Type.String({ format: "uuid" }),
  season: Type.Number(),
  episode: Type.Number(),
  isWatched: Nullable(Type.Boolean()),
  tmdbId: Type.String(),
  userId: Type.String({ format: "uuid" }),
  atSecond: Type.Number(),
});

export const lastWatchedCreateSchemaInputType = Type.Object({
  season: Type.Number(),
  episode: Type.Number(),
  isWatched: Nullable(Type.Boolean()),
  tmdbId: Type.String(),
  userId: Type.String({ format: "uuid" }),
  atSecond: Type.Number(),
});

export const lastWatchedPatchSchemaOutputType = Type.Object({
  id: Type.String({ format: "uuid" }),
  season: Type.Number(),
  episode: Type.Number(),
  isWatched: Nullable(Type.Boolean()),
  tmdbId: Type.String(),
  userId: Type.String({ format: "uuid" }),
  atSecond: Type.Number(),
});

export const lastWatchedPatchSchemaInputType = Type.Object({
  season: UndefinedOr(Type.Number()),
  episode: UndefinedOr(Type.Number()),
  isWatched: UndefinedOr(Type.Boolean()),
  tmdbId: UndefinedOr(Type.String()),
  userId: UndefinedOr(Type.String({ format: "uuid" })),
  atSecond: UndefinedOr(Type.Number()),
});

export type LastWatchedCreateInput = Static<
  typeof lastWatchedCreateSchemaInputType
>;
export type LastWatchedCreateOutput = Static<
  typeof lastWatchedCreateSchemaOutputType
>;
export type LastWatchedPatchInput = Static<
  typeof lastWatchedPatchSchemaInputType
>;
export type LastWatchedPatchOutput = Static<
  typeof lastWatchedPatchSchemaOutputType
>;
