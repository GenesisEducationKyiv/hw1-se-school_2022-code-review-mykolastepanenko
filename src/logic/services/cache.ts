import NodeCache from "node-cache";
import CacheChain from "./cache.chain";
import RateService from "./rate";

export default class RateCacheProxy extends CacheChain {
  private service: RateService;

  constructor(cache: NodeCache, provider: string, service: RateService) {
    super(cache, provider);
    this.service = service;
  }

  public async handle() {
    const data = this.getDataFromCache(this.provider);
    if (data) return data;
    const res = await this.service.handle();
    this.setDataToCache(this.provider, res);

    super.handle();

    return res;
  }

  private getDataFromCache(key: string) {
    if (this.cache.has(key)) {
      const data: any = this.cache.get(key);
      // console.log(`GET: ${key}. DATA: ${data}`);
      return JSON.parse(data);
    }
  }
  private setDataToCache(key: string, data: any) {
    const str = JSON.stringify(data);
    // console.log(`SET: ${key}. DATA: ${data}`);
    this.cache.set(key, str);
  }
}
