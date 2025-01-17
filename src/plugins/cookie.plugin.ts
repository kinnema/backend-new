import fCookie from "@fastify/cookie";
import fp from "fastify-plugin";

export default fp(async function (fastify) {
  await fastify.register(fCookie, {
    secret: process.env.COOKIE_SECRET || "some-secret-key",
    hook: "preHandler",
  });
});
