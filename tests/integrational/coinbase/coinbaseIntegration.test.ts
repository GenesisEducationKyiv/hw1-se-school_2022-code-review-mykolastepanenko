import RateService from "../../../src/logic/services/rate";
import { CURRENCY } from "../../../src/logic/config/config";
import { isPriceEqual } from "./mocks";

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
