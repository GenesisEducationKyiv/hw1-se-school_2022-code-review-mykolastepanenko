import { getRate } from "../../services/rate.js";

describe("Test of Coinbase API integration", () => {
  test("Check status of request", async () => {
    const status = (await getRate("UAH")).ok;
    expect(status).toBe(true);
  });
});
