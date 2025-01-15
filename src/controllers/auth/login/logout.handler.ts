import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify/types/request";

export async function logoutHandler(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  reply.clearCookie("access_token");

  return reply.status(201).send();
}
