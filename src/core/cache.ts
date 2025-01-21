import NodeCache from "node-cache";

export class Cache {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache();
  }

  has(key: string) {
    return this.cache.has(key);
  }

  get<T>(key: string) {
    return this.cache.get<T>(key);
  }

  set<T>(key: string, value: T, ttl: number = 60 * 60 * 24) {
    console.log("Setting cache", key, value, ttl);
    this.cache.set<T>(key, value, ttl);
  }

  delete(key: string) {
    this.cache.del(key);
  }
}

export const cache = new Cache();
