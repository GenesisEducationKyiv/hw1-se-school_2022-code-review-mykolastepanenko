import NodeCache from "node-cache";
import { Request, Response } from "express";
import {
  CURRENCY,
  CRYPTO_CURRENCY_PROVIDER,
  brokerPublisher,
} from "../../logic/config/config";
import RateService from "../../logic/services/rate";
import CacheChain from "../../logic/services/cache.chain";
import Chain from "../../logic/services/chain";
import RateCacheProxy from "../../logic/services/cache";
import ChainDecorator from "../../logic/services/chain.decorator";

const cacheInstance = new NodeCache({
  stdTTL: 5 * 60,
});

export async function getRate(req: Request, res: Response) {
  const service = new RateService(CURRENCY);
  const cache = new CacheChain(cacheInstance, CRYPTO_CURRENCY_PROVIDER);
  const cacheProxy = new RateCacheProxy(
    cacheInstance,
    CRYPTO_CURRENCY_PROVIDER,
    new RateService(CURRENCY)
  );

  cache.setNext(service);
  const chain = new Chain(cacheProxy);
  const chainDecorator = new ChainDecorator(chain);
  const price = await chainDecorator.handle();

  brokerPublisher.send(JSON.stringify(price));

  if (price.ok) {
    res.status(200).json(price.value);
  } else {
    console.error("ERROR", price?.error);
    res.status(400).json("Invalid status value");
  }
}
