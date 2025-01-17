import { prismaClient } from "@src/database/prisma";
import {
  LastWatchedPatchInput,
  LastWatchedPatchOutput,
} from "@src/features/last_watched/schemas/last_watched.schema";
import { FastifyRequest } from "fastify";

export default async function lastWatchedPatchHandler(
  req: FastifyRequest<{ Body: LastWatchedPatchInput; Params: { id: string } }>
): Promise<LastWatchedPatchOutput> {
  const data = await prismaClient.lastWatched.update({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
    data: {
      atSecond: req.body.atSecond,
      episode: req.body.episode,
      season: req.body.season,
      isWatched: req.body.isWatched,
    },
  });

  return data;
}
