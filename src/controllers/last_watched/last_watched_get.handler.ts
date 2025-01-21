import { prismaClient } from "@src/database/prisma";
import { FastifyRequest } from "fastify";

export default async function lastWatchedGetHandler(
  req: FastifyRequest<{
    Params: {
      tmdbId: number;
    };
  }>
) {
  const data = await prismaClient.lastWatched.findFirstOrThrow({
    where: {
      tmdbId: req.params.tmdbId,
    },
    include: {
      user: true,
    },
  });

  return data;
}
