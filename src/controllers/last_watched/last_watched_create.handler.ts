import { prismaClient } from "@src/database/prisma";
import {
  LastWatchedCreateInput,
  LastWatchedCreateOutput,
} from "@src/features/last_watched/schemas/last_watched.schema";
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
      },
    });

    if (isExists) {
      if (
        isExists.episode === req.body.episode &&
        isExists.season === req.body.season
      ) {
        return isExists;
      }

      const updated = await prismaClient.lastWatched.update({
        where: {
          id: isExists.id,
        },
        data: {
          episode: req.body.episode,
          season: req.body.season,
        },
      });

      return updated;
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
