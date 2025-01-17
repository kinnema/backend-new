import { FastifyInstance } from "fastify";

export default async function initializeOpenapiRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    return app.swagger({
      yaml: true,
    });
  });
}

export const autoPrefixed = "/openapi.yaml";
