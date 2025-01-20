import { prismaClient } from "@src/database/prisma";
import {
    FavoriteCreateInput,
    FavoriteOutput,
} from "@src/features/favorites/schemas/favorites.schema";
import { FastifyRequest } from "fastify";

export async function favoritesCreateHandler(
  req: FastifyRequest<{
    Body: FavoriteCreateInput;
  }>
): Promise<FavoriteOutput> {
  try {
    const favorite = await prismaClient.favorite.create({
      data: {
        ...req.body,
        userId: req.user.id,
      },
    });

    return { ...favorite, createdAt: favorite.createdAt.toISOString() };
  } catch (error) {
    req.log.fatal(error);
    throw new Error("Could not create favorite");
  }
} 