import { FastifyInstance } from "fastify";
import initializeWatchRoutes from "./routes/watch.route";

export default function (app: FastifyInstance) {
  initializeWatchRoutes(app);
  app.log.info("Initialized watch route");
}

export const autoPrefix = "/api/watch";
