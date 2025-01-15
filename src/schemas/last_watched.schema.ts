import { z } from "zod";
import { userSchema } from "./user.schema";

export const lastWatchedSchemaOutput = z.object({
  id: z.string().uuid(),
  season: z.number(),
  episode: z.number(),
  isWatched: z.boolean(),
  tmdbId: z.string(),
  userId: z.string(),
  user: userSchema,
  atSecond: z.number(),
});

export const lastWatchedCreateSchemaOutput = z.object({
  id: z.string().uuid(),
  season: z.number(),
  episode: z.number(),
  isWatched: z.boolean().nullable(),
  tmdbId: z.string(),
  userId: z.string(),
  atSecond: z.number(),
});

export const lastWatchedCreateSchemaInput = z.object({
  season: z.number(),
  episode: z.number(),
  isWatched: z.boolean(),
  tmdbId: z.string(),
  userId: z.string(),
  atSecond: z.number(),
});

export const lastWatchedPatchSchemaOutput = z.object({
  id: z.string().uuid(),
  season: z.number(),
  episode: z.number(),
  isWatched: z.boolean().default(false).nullable(),
  tmdbId: z.string(),
  userId: z.string(),
  atSecond: z.number(),
});

export const lastWatchedPatchSchemaInput = z.object({
  season: z.number().optional(),
  episode: z.number().optional(),
  isWatched: z.boolean().optional(),
  tmdbId: z.string().optional(),
  userId: z.string().optional(),
  atSecond: z.number().optional(),
});

export type LastWatchedCreateInput = z.infer<
  typeof lastWatchedCreateSchemaInput
>;
export type LastWatchedCreateOutput = z.infer<
  typeof lastWatchedCreateSchemaOutput
>;
export type LastWatchedPatchInput = z.infer<typeof lastWatchedPatchSchemaInput>;
export type LastWatchedPatchOutput = z.infer<
  typeof lastWatchedPatchSchemaOutput
>;
