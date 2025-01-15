import { prismaClient } from "@src/database/prisma";
import { LoginUserInput } from "@src/schemas/auth/login.schema";
import * as argon2 from "argon2";
import { FastifyReply, FastifyRequest } from "fastify";

export async function loginHandler(
  req: FastifyRequest<{
    Body: LoginUserInput;
  }>,
  reply: FastifyReply
) {
  const { email, password } = req.body;
  const user = await prismaClient.user.findUnique({
    where: { email: email },
  });
  const isMatch = user && (await argon2.verify(user.password, password));
  if (!user || !isMatch) {
    return reply.code(401).send({
      message: "Invalid email or password",
    });
  }
  const payload = {
    id: user.id,
    email: user.email,
    name: user.username,
  };
  const token = req.jwt.sign(payload);

  reply.setCookie("access_token", token, {
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7, // for a week
    httpOnly: true,
    secure: true,
  });

  return user;
}
