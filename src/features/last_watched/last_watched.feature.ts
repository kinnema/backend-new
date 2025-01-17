import { FastifyInstance } from "fastify";
import initializeLastWatchesRoutes from "./routes/last_watched.route";
import { addLastWatchedSchemas } from "./schemas";

export const autoPrefix = "/api/last_watched";

export default function (app: FastifyInstance) {
  addLastWatchedSchemas(app);
  initializeLastWatchesRoutes(app);

  app.log.info("Initialized last watched routes");
}
