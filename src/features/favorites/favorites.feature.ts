import { FastifyInstance } from "fastify";
import initializeFavoritesRoutes from "./routes/favorites.route";
import { addFavoriteSchemas } from "./schemas/favorites.schema";

export const autoPrefix = "/api/favorites";

export default function (app: FastifyInstance) {
  addFavoriteSchemas(app);
  initializeFavoritesRoutes(app);
  app.log.info("Initialized favorites routes");
} 