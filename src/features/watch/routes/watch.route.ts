import { watchGetHandler } from "@src/controllers/watch/watch_get.handler";
import { FastifyInstance } from "fastify";
import { WatchQueryParamsSchema } from "../watch.schema";

export default async function initializeWatchRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: {
        querystring: WatchQueryParamsSchema,
      },
    },
    watchGetHandler
  );
}
