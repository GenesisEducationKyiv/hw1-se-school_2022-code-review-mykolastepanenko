import axios from "axios";
import NodeCache from "node-cache";
import { CRYPTO_CURRENCY_PROVIDER } from "../config/config";

import Logger from "./logger";

const rateCache = new NodeCache({
  stdTTL: 5 * 60,
});

class RateFactoryCreator {
  createProvider() {}
}
class CoinbaseProviderCreator extends RateFactoryCreator {
  createProvider() {
    return new CoinbaseProvider();
  }
}
class BinanceProviderCreator extends RateFactoryCreator {
  createProvider() {
    return new BinanceProvider();
  }
}

class RateProvider {
  async getRate(currency: string) {}
}

class CoinbaseProvider extends RateProvider {
  next: any;

  async getRate(currency: string) {
    try {
      const response = await axios.get(
        `https://api.coinbase.com/v2/prices/spot?currency=${currency.toUpperCase()}`
      );
      const price = response.data.data.amount;
      return {
        ok: true,
        value: parseFloat(price),
        source: "coinbase",
        currency: currency.toUpperCase(),
      };
    } catch (err: any) {
      const next = this.next.getRate(currency);
      if (next) {
        console.log(this.constructor.name, "FAILED");
        return next;
      }
      return { ok: false, error: "Couln't get BTC price" };
    }
  }

  setNext(provider: any) {
    this.next = provider;
    return this.next;
  }
}

class BinanceProvider extends RateProvider {
  next: any;

  async getRate(currency: string) {
    try {
      const response = await axios.get(
        `https://api.binance.com/api/v3/avgPrice?symbol=BTC${currency.toUpperCase()}`
      );
      const price = response.data.price;
      return {
        ok: true,
        value: parseFloat(price),
        source: "binance",
        currency: currency.toUpperCase(),
      };
    } catch (err: any) {
      const next = this.next.getRate(currency);
      if (next) {
        console.log(this.constructor.name, "FAILED");
        return next;
      }
      return { ok: false, error: "Couln't get BTC price" };
    }
  }

  setNext(provider: any) {
    this.next = provider;
    return this.next;
  }
}

class RateSimpleFactory {
  createProvider(provider: any) {
    switch (provider.toLowerCase()) {
      case "coinbase":
        return new CoinbaseProviderCreator().createProvider();
      case "binance":
        return new BinanceProviderCreator().createProvider();
      default:
        throw new Error(
          `"${provider.toUpperCase()}" RATE PROVIDER IS NOT EXISTS`
        );
    }
  }
}

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
