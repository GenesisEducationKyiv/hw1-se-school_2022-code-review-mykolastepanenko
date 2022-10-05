import NodeCache from "node-cache";
import { CRYPTO_CURRENCY_PROVIDER, brokerPublisher } from "../config/config";
import Logger from "./logger";
import RateSimpleFactory from "../../logic/factories/rate";

const rateCache = new NodeCache({
  stdTTL: 5 * 60,
});

class RateService {
  async getRate(currency: string) {
    let log: string;
    let price: number;
    const provider = new RateSimpleFactory().createProvider(
      CRYPTO_CURRENCY_PROVIDER
    );

    if (rateCache.has(CRYPTO_CURRENCY_PROVIDER)) {
      price = rateCache.get(CRYPTO_CURRENCY_PROVIDER);
      log = `CACHED ${CRYPTO_CURRENCY_PROVIDER} - Response: ${JSON.stringify(
        price
      )}`;
    } else {
      provider.setNext(new RateSimpleFactory().createProvider("coinbase"));
      price = await provider.getRate(currency);
      rateCache.set(CRYPTO_CURRENCY_PROVIDER, price);
      log = `${CRYPTO_CURRENCY_PROVIDER} - Response: ${JSON.stringify(price)}`;
    }
    Logger.rateLogger(log);
    brokerPublisher.send(log);
    return price;
  }
}

export default RateService;
