import { Cache } from "@src/core/cache";
import { IWatchGetParams } from "@src/features/watch/watch.schema";
import * as cheerio from "cheerio";
import { FastifyInstance } from "fastify";
import { BaseProvider, IFetchResult, ProviderPriority } from "./base.provider";

export default class DizipalBrowserProvider extends BaseProvider {
  constructor() {
    super(
      "dizipal_browser",
      ProviderPriority.LOW,
      true,
      "https://dizipal871.com"
    );
  }

  async fetch(
    params: IWatchGetParams,
    app: FastifyInstance,
    cache: Cache
  ): Promise<IFetchResult> {
    try {
      const cachedUrl = await this.fetchFromCache(params, cache);

      if (cachedUrl.url) {
        return cachedUrl;
      }

      const url = `${this.providerUrl}/dizi/${params.id}/sezon-${params.season_number}/bolum-${params.episode_number}`;

      const response = await fetch(process.env.PROXY_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "GET",
          url: url,
          browser: true,
          headers: {},
          body: {},
          timeout: 60,
          response_type: "text",
          wait_for_selector: "iframe",
        }),
      });

      const data = await response.text();

      const $ = cheerio.load(data);
      const videoLink = $("#vast_new > iframe").attr("src");
      if (videoLink) {
        const videoResponse = await fetch(videoLink, {
          headers: {
            Referer: url,
          },
        });
        const text = await videoResponse.text();
        const fileMatch = text.match(/file:"([^"]+)/);
        if (fileMatch && fileMatch[1]) {
          cache.set<string>(this.generateCacheKey(params), fileMatch[1]);
          return {
            provider: this.name,
            url: fileMatch[1],
          };
        }
      }

      return {
        provider: this.name,
        error: "Video not found",
      };
    } catch (error) {
      app.log.error(error);
      return {
        provider: this.name,
        error: "Video not found",
      };
    }
  }
}
