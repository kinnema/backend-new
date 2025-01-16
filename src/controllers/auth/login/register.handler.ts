import { prismaClient } from "@src/database/prisma";
import { CreateUserInput } from "@src/features/auth/schemas/auth/register.schema";
import * as argon2 from "argon2";
import { FastifyReply, FastifyRequest } from "fastify";

export async function registerHandler(
  req: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) {
  const { password, email, username } = req.body;
  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    return reply.code(401).send({
      message: "User already exists with this email",
    });
  }
  try {
    const hash = await argon2.hash(password);
    const user = await prismaClient.user.create({
      data: {
        password: hash,
        email,
        username,
      },
    });
    return reply.code(201).send(user);
  } catch (e) {
    return reply.code(500).send(e);
  }
}
