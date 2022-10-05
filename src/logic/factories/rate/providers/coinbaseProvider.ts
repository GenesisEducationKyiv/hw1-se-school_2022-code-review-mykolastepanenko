import axios from "axios";
import { IRateProvider } from "./interfaces";

export class CoinbaseProvider implements IRateProvider {
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

