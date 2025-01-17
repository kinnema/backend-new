import fp from "fastify-plugin";

export default fp(async function (fastify) {
  if (process.env.NODE_ENV !== "development") return;

  const scalarModule = await import("@scalar/fastify-api-reference");
  const swaggerModule = await import("@fastify/swagger");

  await fastify.register(swaggerModule.default, {
    openapi: {
      info: {
        title: "Kinnema",
        version: "1.0.0",
      },
    },
  });

  await fastify.register(scalarModule.default, {
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
