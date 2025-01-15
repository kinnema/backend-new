import { prismaClient } from "@src/database/prisma";
import { FastifyRequest } from "fastify";

export async function lastWatchedRootHandler(req: FastifyRequest) {
  const lastWatched = await prismaClient.lastWatched.findMany({
    where: {
      userId: req.user.id,
      isWatched: false,
    },
    include: {
      user: true,
    },
  });

  return lastWatched;
}
