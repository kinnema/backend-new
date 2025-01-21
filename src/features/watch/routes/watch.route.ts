import { providerRegistry } from "@src/providers/provider.registry";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  IWatchGetParams,
  WatchProvidersSchema,
  WatchQueryParamsSchema,
} from "../watch.schema";

export default async function initializeWatchRoutes(app: FastifyInstance) {
  app.get(
    "/providers",
    {
      schema: {
        response: {
          200: WatchProvidersSchema,
        },
      },
    },
    async () => {
      return {
        providers: providerRegistry.getSortedProviders(),
      };
    }
  );

  app.get(
    "/",
    {
      schema: {
        querystring: WatchQueryParamsSchema,
      },
    },
    async (
      _req: FastifyRequest<{ Querystring: IWatchGetParams }>,
      reply: FastifyReply
    ) => {
      const providers = providerRegistry.getSortedProviders();

      reply.raw.writeHead(200, {
        "Content-Type": "application/x-ndjson",
        "Transfer-Encoding": "chunked",
        "Access-Control-Allow-Origin": process.env.FRONTEND_URL,
        "Access-Control-Allow-Credentials": "true",
      });

      for (const provider of providers) {
        try {
          const url = await provider.fetch(_req.query, app);
          if (url) {
            reply.raw.write(JSON.stringify(url) + "\r\n");
            // break;
          }
        } catch (error) {
          console.error(`Error fetching from ${provider.name}:`, error);
        }
      }

      // End the response stream
      reply.raw.end();
      return reply;
    }
  );
}
