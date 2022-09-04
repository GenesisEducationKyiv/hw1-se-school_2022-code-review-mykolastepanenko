import { getRate } from "../../services/rate.js";

describe("Test of rate function", () => {
  test("Check type of result", async () => {
    const price = (await getRate("UAH")).value;
    expect(typeof price).toBe("number");
  });
});
