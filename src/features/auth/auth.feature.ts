import { FastifyInstance } from "fastify";
import initializeAuthRoutes from "./routes/auth.route";
import { addAuthSchemas } from "./schemas";

export default async function (app: FastifyInstance) {
  await initializeAuthRoutes(app);
  addAuthSchemas(app);
  app.log.info("Initialized auth route");
}

export const autoPrefix = "/api/auth";
