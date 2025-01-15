import { $appSchemas } from "@src/schemas";
import { FastifyInstance } from "fastify";

export default function userRoutes(app: FastifyInstance) {
    app.get('/last_watched', {
        schema: {
            response: {
                200: $appSchemas("lastWatchedSchema")
            }
        },
        preHandler: [app.authenticate]
    }, () => {})
}
