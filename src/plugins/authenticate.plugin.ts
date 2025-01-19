import { User } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export default fp(async function (fastify) {
  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const token = request.headers.authorization;

      if (!token) {
        return reply.status(401).send({ message: "Authentication required" });
      }

      const decoded = request.jwt.verify(token.split(" ")[1]);
      request.user = decoded as User;
    }
  );
});
