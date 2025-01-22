import { prismaClient } from "@src/database/prisma";
import { FastifyReply, FastifyRequest } from "fastify";

export async function lastWatchedDeleteHandler(
  req: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply
): Promise<void> {
  try {
    await prismaClient.lastWatched.delete({
      where: {
        id: req.params.id,
      },
    });

    return reply.status(204).send();
  } catch (error) {
    req.log.error(error);
    throw new Error("Could not delete");
  }
}
