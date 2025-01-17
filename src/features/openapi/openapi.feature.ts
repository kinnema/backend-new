import { FastifyInstance } from "fastify";
import initializeOpenapiRoutes from "./routes/openapi.route";

export default function (app: FastifyInstance) {
  initializeOpenapiRoutes(app);
  app.log.info("Initialized openapi route");
}

export const autoPrefix = "/openapi.yaml";
