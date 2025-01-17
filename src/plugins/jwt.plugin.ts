import fjwt from "@fastify/jwt";
import fp from "fastify-plugin";

export default fp(async function (fastify) {
  await fastify.register(fjwt, {
    secret: process.env.JWT_SECRET || "some-secret-key",
  });

  fastify.addHook("preHandler", (req, _res, next) => {
    req.jwt = fastify.jwt;
    return next();
  });
});
