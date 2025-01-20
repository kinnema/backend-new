import { prismaClient } from "@src/database/prisma";
import { FastifyRequest } from "fastify";

export async function favoritesGetHandler(req: FastifyRequest) {
  const favorites = await prismaClient.favorite.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      user: true,
    },
  });

  return favorites.map(f => ({ ...f, createdAt: f.createdAt.toISOString() }));
} 