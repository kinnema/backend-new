import { prismaClient } from "@src/database/prisma";
import { FastifyRequest } from "fastify";

export default async function lastWatchedGetHandler(
  req: FastifyRequest<{
    Params: {
      id: string;
    };
  }>
) {
  const data = await prismaClient.lastWatched.findFirstOrThrow({
    where: {
      id: req.params.id,
    },
    include: {
      user: true,
    },
  });

  return data;
}
