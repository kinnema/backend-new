import { prismaClient } from "@src/database/prisma";
import {
  LastWatchedPatchInput,
  LastWatchedPatchOutput,
} from "@src/schemas/last_watched.schema";
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
      ...req.body,
    },
  });

  return data;
}
