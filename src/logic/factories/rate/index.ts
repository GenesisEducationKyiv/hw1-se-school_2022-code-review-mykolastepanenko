import { CoinbaseProviderCreator, BinanceProviderCreator } from "./creators";

export default class RateSimpleFactory {
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
