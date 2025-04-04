import { Cache } from "@src/core/cache";
import { IWatchGetParams } from "@src/features/watch/watch.schema";
import * as cheerio from "cheerio";
import { FastifyInstance } from "fastify";
import fetch from "node-fetch";
import { BaseProvider, IFetchResult, ProviderPriority } from "./base.provider";

export default class DizipalProvider extends BaseProvider {
  constructor() {
    super(
      "dizipal",
      ProviderPriority.HIGH,
      true,
      "https://dizipal951-dotcom.gateway.web.tr"
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

      const headersObject = {
        "Accept-Language": "tr,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
        "Sec-Ch-Ua-Platform": "Windows",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0",
        Cookie:
          "dizipal951_com=%7B%22HttpHost%22%3A%22dizipal951.com%22%2C%22Protokol%22%3A%22https%22%2C%22Port%22%3A443%2C%22KulAdSifre%22%3Anull%2C%22UrlAdresi%22%3A%22%5C%2Fdizi%5C%2Fgassal%5C%2Fsezon-1%5C%2Fbolum-1%22%2C%22GetVeri%22%3Anull%2C%22GitOpjeId%22%3Anull%2C%22DnsAdresi%22%3A%2213%22%2C%22URL_Adresi%22%3A%22https%3A%5C%2F%5C%2Fdizipal871.com%5C%2Fdizi%5C%2Fgassal%5C%2Fsezon-1%5C%2Fbolum-1%22%2C%22GirisIP%22%3A%22104.21.112.1%22%7D",
        Origin: "https://dizipal951.com",
        Referer: "https://dizipal951.com",
      };

      const url = `${this.providerUrl}/dizi/${params.serie_name}/sezon-${params.season_number}/bolum-${params.episode_number}`;

      const response = await fetch(url, {
        headers: headersObject,
      });

      const responseBody = await response.text();

      const $ = cheerio.load(responseBody);
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
    } catch (error: unknown) {
      app.log.error(error);
      return {
        provider: this.name,
        error: "Video not found",
      };
    }
  }
}
