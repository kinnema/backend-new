import { providerRegistry } from "@src/providers/provider.registry";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IWatchGetParams, WatchGetParamsSchema } from "../watch.schema";

export default async function initializeWatchRoutes(app: FastifyInstance) {
  app.get(
    "/:serie_name/:season_number/:episode_number",
    {
      schema: {
        params: WatchGetParamsSchema,
      },
    },
    async (
      _req: FastifyRequest<{ Params: IWatchGetParams }>,
      reply: FastifyReply
    ) => {
      const providers = providerRegistry.getSortedProviders();

      reply.raw.writeHead(200, {
        "Content-Type": "application/x-ndjson",
        "Transfer-Encoding": "chunked",
      });

      const fetchPromises = providers.map(async (provider) => {
        try {
          const url = await provider.fetch(_req.params);
          if (url) {
            // Stream each result as it arrives
            reply.raw.write(
              JSON.stringify({ provider: provider.name, url }) + "\r\n"
            );
          }
        } catch (error) {
          console.error(`Error fetching from ${provider.name}:`, error);
        }
      });

      await Promise.all(fetchPromises);

      // End the response stream
      reply.raw.end();
      return reply;
    }
  );
}
