import NodeCache from "node-cache";
import { CRYPTO_CURRENCY_PROVIDER } from "../config/config";
import Logger from "./logger";
import RateSimpleFactory from "logic/factories/rate";

const rateCache = new NodeCache({
  stdTTL: 5 * 60,
});

class RateService {
  async getRate(currency: string) {
    const provider = new RateSimpleFactory().createProvider(
      CRYPTO_CURRENCY_PROVIDER
    );

    if (rateCache.has(CRYPTO_CURRENCY_PROVIDER)) {
      const price = rateCache.get(CRYPTO_CURRENCY_PROVIDER);
      const log = `CACHED ${CRYPTO_CURRENCY_PROVIDER} - Response: ${JSON.stringify(
        price
      )}`;
      Logger.rateLogger(log);
      return price;
    } else {
      provider.setNext(new RateSimpleFactory().createProvider("coinbase"));
      const price = await provider.getRate(currency);
      rateCache.set(CRYPTO_CURRENCY_PROVIDER, price);
      const log = `${CRYPTO_CURRENCY_PROVIDER} - Response: ${JSON.stringify(
        price
      )}`;
      Logger.rateLogger(log);
      return price;
    }
  }
}

export default RateService;
