import { z } from "zod";
import { userSchema } from "./user.schema";

export const lastWatchedSchemaOutput = z.object({
  id: z.string(),
  season: z.number(),
  episode: z.number(),
  isWatched: z.boolean(),
  tmdbId: z.string(),
  userId: z.string(),
  user: userSchema,
  atSecond: z.number(),
});

export const lastWatchedSchemaInput = z.object({
  id: z.string().optional(),
  season: z.number(),
  episode: z.number(),
  isWatched: z.boolean(),
  tmdbId: z.string(),
  userId: z.string(),
  atSecond: z.number(),
});
