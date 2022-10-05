import { IRateFactoryCreator } from "./interfaces";
import { CoinbaseProvider } from "../providers/coinbaseProvider";

export class CoinbaseProviderCreator implements IRateFactoryCreator {
  createProvider() {
    return new CoinbaseProvider();
  }
}
