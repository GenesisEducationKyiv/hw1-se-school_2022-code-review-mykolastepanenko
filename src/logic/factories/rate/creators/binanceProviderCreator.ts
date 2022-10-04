import { IRateFactoryCreator } from "./interfaces";
import { BinanceProvider } from "../providers/binanceProvider";

export class BinanceProviderCreator implements IRateFactoryCreator {
  createProvider() {
    return new BinanceProvider();
  }
}
