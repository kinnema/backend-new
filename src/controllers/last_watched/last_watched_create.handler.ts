import { prismaClient } from "@src/database/prisma";
import {
  LastWatchedCreateInput,
  LastWatchedCreateOutput,
} from "@src/schemas/last_watched.schema";
import { FastifyRequest } from "fastify";

export async function lastWatchedCreateHandler(
  req: FastifyRequest<{
    Body: LastWatchedCreateInput;
  }>
): Promise<LastWatchedCreateOutput> {
  try {
    const isExists = await prismaClient.lastWatched.findFirst({
      where: {
        tmdbId: req.body.tmdbId,
        episode: req.body.episode,
        season: req.body.season,
      },
    });

    if (isExists) {
      return isExists;
    }

    const lastWatched = await prismaClient.lastWatched.create({
      data: {
        ...req.body,
        userId: req.user.id,
      },
    });

    return lastWatched;
  } catch (error) {
    req.log.fatal(error);
    throw new Error("Could not create");
  }
}
