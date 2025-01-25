import { FastifyInstance } from "fastify";
import initializeWatchRoutes from "./routes/watch.route";
import { addWatchSchemas } from "./watch.schema";

export default function (app: FastifyInstance) {
  addWatchSchemas(app);
  initializeWatchRoutes(app);
  app.log.info("Initialized watch route");
}

export const autoPrefix = "/api/watch";
