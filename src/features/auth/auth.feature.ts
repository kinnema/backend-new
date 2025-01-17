import { FastifyInstance } from "fastify";
import initializeAuthRoutes from "./routes/auth.route";
import { addAuthSchemas } from "./schemas";

export default function (app: FastifyInstance) {
  addAuthSchemas(app);
  initializeAuthRoutes(app);
  app.log.info("Initialized auth route");
}

export const autoPrefix = "/api/auth";
