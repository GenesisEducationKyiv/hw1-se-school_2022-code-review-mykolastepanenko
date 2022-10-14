import { CRYPTO_CURRENCY_PROVIDER } from "../config/config";
import RateSimpleFactory from "../../logic/factories/rate";
import ChainElement from "./chain.element";
import { TRate } from "../../logic/factories/rate/providers/types";

class RateService extends ChainElement {
  private currency: string;

  constructor(currency: string) {
    super();
    this.currency = currency;
  }

  async handle(): Promise<any> {
    let price: TRate;
    const provider = new RateSimpleFactory().createProvider(
      CRYPTO_CURRENCY_PROVIDER
    );
    price = await provider.getRate(this.currency);
    return price;
  }
}

export default RateService;
