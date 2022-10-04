import {
  actionInBinance,
  getCryptocurrency,
  getCurrency,
  getPrice,
} from "./mocks";

describe("E2E testing Binance", () => {
  const cryptocurrency = "BTC";
  const currency = "USD";

  jest.setTimeout(60 * 1000);

  test(`Check cryptocurrency equals ${cryptocurrency}`, async () => {
    expect(await actionInBinance(getCryptocurrency)).toBe(cryptocurrency);
  });

  test(`Check currency equals ${currency}`, async () => {
    expect(await actionInBinance(getCurrency)).toBe(currency);
  });

  test(`Check type of the price. Should be a number`, async () => {
    const result = await actionInBinance(getPrice);
    expect(result).toEqual(expect.any(Number));
  });
});
