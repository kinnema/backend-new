import { Cache } from "@src/core/cache";
import { IWatchGetParams } from "@src/features/watch/watch.schema";
import { FastifyInstance } from "fastify";

export enum ProviderPriority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

export interface IFetchResult {
  provider: string;
  url?: string;
  error?: string;
}

export interface IProvider {
  name: string;
  priority: ProviderPriority;
  isEnabled: boolean;
  providerUrl: string;

  // Method to fetch data - generic type T for flexibility
  fetch(
    params: IWatchGetParams,
    app: FastifyInstance,
    cache: Cache
  ): Promise<IFetchResult>;
}

// Abstract class that implements the interface
export abstract class BaseProvider implements IProvider {
  constructor(
    public readonly name: string,
    public readonly priority: ProviderPriority,
    public isEnabled: boolean,
    public readonly providerUrl: string
  ) {}

  abstract fetch(
    params: IWatchGetParams,
    app: FastifyInstance,
    cache: Cache
  ): Promise<IFetchResult>;

  protected generateCacheKey(params: IWatchGetParams): string {
    return `${this.name}-${params.serie_name}-${params.season_number}-${params.episode_number}`;
  }

  protected async fetchFromCache(
    params: IWatchGetParams,
    cache: Cache
  ): Promise<IFetchResult> {
    const cachedUrl = cache.get<string>(this.generateCacheKey(params));
    if (!cachedUrl) {
      return { provider: this.name, error: "Video not found" };
    }
    return { provider: this.name, url: cachedUrl };
  }
}
