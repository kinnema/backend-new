import { Cache } from "@src/core/cache";
import { IWatchGetParams } from "@src/features/watch/watch.schema";
import * as cheerio from "cheerio";
import { FastifyInstance } from "fastify";
import { BaseProvider, IFetchResult, ProviderPriority } from "./base.provider";

interface Servers {
    name: string | null;
    dataHash: string | null;
}


interface RCPResponse {
    metadata: {
        image: string;
    };
    data: string;
}

export class VidsrcProvider extends BaseProvider {
    private BASEDOM: string = "https://cloudnestra.com";
    private SOURCE_URL: string = "https://vidsrc.xyz/embed";

    constructor() {
        super(
            "vidsrc",
            ProviderPriority.HIGH,
            true,
            "https://vidsrc.xyz"
        );
    }

    async fetch(params: IWatchGetParams, _app: FastifyInstance, _cache: Cache): Promise<IFetchResult> {

        const servers = await this.fetchServers(params)

        if (!servers || !servers.servers || servers.servers.length === 0) {
            throw new Error("No servers found");
        }

        const rcpFetchPromises = servers.servers.map(element => {
            return fetch(`${this.BASEDOM}/rcp/${element.dataHash}`, {
                headers: {
                    'Sec-Fetch-Dest': 'iframe'
                }
            });
        });

        const rcpResponses = await Promise.all(rcpFetchPromises);

        const prosrcrcp = await Promise.all(rcpResponses.map(async (response, _i) => {
            return this.rcpGrabber(await response.text());
        }));


        for (const item of prosrcrcp) {
            console.log("Processing item:", item);

            if (!item) continue;
            return {
                provider: this.name,
                url: await this.PRORCPhandler(item.data.replace("/prorcp/", "")) || undefined,
            }

        }

        return {
            provider: this.name,
        }

    }

    private async PRORCPhandler(prorcp: string): Promise<string | null> {
        try {
            const prorcpFetch = await fetch(`${this.BASEDOM}/prorcp/${prorcp}`, {
                headers: {
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.9",
                    "priority": "u=1",
                    "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "script",
                    "sec-fetch-mode": "no-cors",
                    "sec-fetch-site": "same-origin",
                    'Sec-Fetch-Dest': 'iframe',
                    "Referer": `${this.BASEDOM}/`,
                    "Referrer-Policy": "origin",
                },
            });
            if (!prorcpFetch.ok) {
                console.error("Failed to fetch PRORCP:", prorcpFetch.status, prorcpFetch.statusText);
                return null;
            }

            const prorcpResponse = await prorcpFetch.text();

            console.log("PRORCP Response:", prorcpResponse);
            const regex = /file:\s*'([^']*)'/gm;
            const match = regex.exec(prorcpResponse);
            if (match && match[1]) {
                return match[1];
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    private async rcpGrabber(html: string): Promise<RCPResponse | null> {
        const regex = /src:\s*'([^']*)'/;
        const match = html.match(regex);
        if (!match) return null;
        return {
            metadata: {
                image: "",
            },
            data: match[1],
        };
    }

    private async fetchServers(params: IWatchGetParams): Promise<{ servers: Servers[]; title: string }> {

        try {
            const url = `${this.SOURCE_URL}/tv/${params.id}/${params.season_number}/${params.episode_number}`;
            console.log("Fetching servers from URL:", url);
            const response = await fetch(url)
            const responseBody = await response.text();

            const cheerioBody = cheerio.load(responseBody);
            const servers = await this.serversLoad(cheerioBody.html());


            return servers
        } catch (error) {
            console.error("Error fetching servers:", error);
            throw new Error("Failed to fetch servers");

        }

    }


    private async serversLoad(html: string): Promise<{ servers: Servers[]; title: string }> {
        const $ = cheerio.load(html);
        const servers: Servers[] = [];
        const title = $("title").text() ?? "";
        const base = $("iframe").attr("src") ?? "";
        this.BASEDOM = new URL(base.startsWith("//") ? "https:" + base : base).origin ?? this.BASEDOM;

        $(".serversList .server").each((_, element) => {
            const server = $(element);
            servers.push({
                name: server.text().trim(),
                dataHash: server.attr("data-hash") ?? null,
            });
        });
        return {
            servers: servers,
            title: title,
        };
    }



}