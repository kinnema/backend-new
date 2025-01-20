import { prismaClient } from "@src/database/prisma";
import { FastifyRequest } from "fastify";

export async function favoritesDeleteHandler(
  req: FastifyRequest<{
    Params: {
      id: string;
    };
  }>
) {
  const favorite = await prismaClient.favorite.delete({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });

  return { ...favorite, createdAt: favorite.createdAt.toISOString() };
} 