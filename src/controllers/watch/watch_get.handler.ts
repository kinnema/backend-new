import { cache } from "@src/core/cache";
import { IWatchGetParams } from "@src/features/watch/watch.schema";
import { providerRegistry } from "@src/providers/provider.registry";
import { FastifyReply, FastifyRequest } from "fastify";

export async function watchGetHandler(
  req: FastifyRequest<{ Querystring: IWatchGetParams }>,
  reply: FastifyReply
) {
  const providers = providerRegistry.getSortedProviders();

  reply.raw.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Access-Control-Allow-Origin": process.env.FRONTEND_URL,
    "Access-Control-Allow-Credentials": "true",
    "Cache-Control": "no-cache",
  });

  reply.raw.write(
    `data: ${JSON.stringify({
      type: "init",
      data: {
        providers,
      },
    })}\n\n`
  );

  for (const provider of providers) {
    reply.raw.write(
      `data: ${JSON.stringify({
        type: "trying_provider",
        data: provider.name,
      })}\n\n`
    );
    try {
      const url = await provider.fetch(req.query, req.server, cache);
      if (url.url) {
        reply.raw.write(
          `data: ${JSON.stringify({
            type: "provider_success",
            data: {
              provider: provider.name,
              url: url.url,
            },
          })}\n\n`
        );
        break;
      }

      reply.raw.write(
        `data: ${JSON.stringify({
          type: "provider_failed",
          data: provider.name,
        })}\n\n`
      );
    } catch (error) {
      console.error(`Error fetching from ${provider.name}:`, error);
    }
  }

  reply.raw.write(
    `data: ${JSON.stringify({
      type: "end",
    })}\n\n`
  );
  reply.raw.end();
}
