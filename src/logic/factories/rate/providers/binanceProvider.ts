import axios from "axios";
import { IRateProvider } from "./interfaces";
import { TRate } from "./types";

export class BinanceProvider implements IRateProvider {
  next: any;

  async getRate(currency: string): Promise<TRate> {
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
