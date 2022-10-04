import RateService from "../../../services/rate.js";
import { CURRENCY } from "../../../config/config.js";
import { isPriceEqual } from "./mocks.js";

describe("Test of Coinbase API integration", () => {
  test('Check the currency. Should be "UAH"', () => {
    expect(CURRENCY).toBe("UAH");
  });

  test("Check status of request", async () => {
    const service = new RateService();
    const status = (await service.getRate(CURRENCY)).ok;
    expect(status).toBe(true);
  });

  test("Check type of value. Should be a number", async () => {
    const service = new RateService();
    const res = await service.getRate(CURRENCY);
    expect(res.value).toEqual(expect.any(Number));
  });

  test("Price comparison", async () => {
      await isPriceEqual(CURRENCY)
  });
});