import axios from "axios";
import RateService from "../../../services/rate";
import { floorFraction } from "../../../services/math";

export async function isPriceEqual(currency: string) {
  const service = new RateService();
  const promises = [service.getRate(currency), getRateMock(currency)];

  try {
    const [prodRes, mockRes] = await Promise.all(promises);
    const result = floorFraction(prodRes.value, 1);
    const exptected = floorFraction(mockRes.value, 1);
    expect(result).toBe(exptected);
  } catch (err: any) {
    throw new Error(err);
  }
}

async function getRateMock(currency: string) {
  try {
    const response = await axios.get(
      `https://api.coinbase.com/v2/prices/spot?currency=${currency}`
    );
    const price = response.data.data.amount;
    return { ok: true, value: parseFloat(price) };
  } catch (err: any) {
    return { ok: false, error: "Couln't get BTC price" };
  }
}
