import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth.routes";
import lastWatchedRoutes from "./last_watched.routes";
import userRoutes from "./user.routes";

export function registerRoutes(app: FastifyInstance) {
  const routes = [authRoutes, userRoutes, lastWatchedRoutes];

  for (const route of routes) {
    const routePrefix = route.name.split("Routes")[0];

    app.register(route, {
      prefix: `/api/${routePrefix}`,
    });
  }
}
