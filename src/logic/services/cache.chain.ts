import NodeCache from "node-cache";
import ChainElement from "./chain.element";

export default class CacheChain extends ChainElement {
  private _cache: NodeCache;
  private _provider: string;

  get provider(): string {
    return this._provider;
  }

  get cache(): NodeCache {
    return this._cache;
  }

  constructor(cache: NodeCache, provider: string) {
    super();
    this._cache = cache;
    this._provider = provider;
  }
}
