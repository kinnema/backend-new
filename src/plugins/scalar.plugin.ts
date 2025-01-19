import fastifySwagger from "@fastify/swagger";
import scalar from "@scalar/fastify-api-reference";
import fp from "fastify-plugin";

export default fp(async function (fastify) {
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Kinnema",
        version: "1.0.0",
      },
    },
  });

  await fastify.register(scalar, {
    routePrefix: "/reference",
    hooks: {
      onRequest: function (_request, _reply, done) {
        done();
      },
      preHandler: function (_request, _reply, done) {
        done();
      },
    },
  });
});
