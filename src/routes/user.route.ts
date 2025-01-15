import { $appSchemas } from "@src/schemas";
import { FastifyInstance } from "fastify";

export default function (app: FastifyInstance) {
  app.get(
    "/last_watched",
    {
      schema: {
        response: {
          200: $appSchemas("lastWatchedSchemaOutput"),
        },
      },
      preHandler: [app.authenticate],
    },
    () => {}
  );
}

export const autoPrefix = "/api/user";
