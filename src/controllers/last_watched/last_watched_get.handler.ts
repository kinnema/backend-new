import { prismaClient } from "@src/database/prisma";
import { FastifyReply, FastifyRequest } from "fastify";

export default async function lastWatchedGetHandler(
  req: FastifyRequest<{
    Params: {
      tmdbId: number;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const data = await prismaClient.lastWatched.findFirstOrThrow({
      where: {
        tmdbId: req.params.tmdbId,
      },
      include: {
        user: true,
      },
    });

    return data;
  } catch (error) {
    req.log.error(error);

    return reply.status(404).send({
      error: "Last watched not found",
    });
  }
}
