import puppeteer from "puppeteer";

describe("E2E testing Binance", () => {
  const cryptocurrency = "BTC";
  const currency = "USD";

  jest.setTimeout(12 * 1000);

  test(`Check cryptocurrency equals ${cryptocurrency}`, async () => {
    expect(await actionInBinance(getCryptocurrency)).toBe(cryptocurrency);
  });

  test(`Check currency equals ${currency}`, async () => {
    expect(await actionInBinance(getCurrency)).toBe(currency);
  });

  test(`Check type of the price. Should be a number`, async () => {
    const result = await actionInBinance(getPrice)
    expect(result).toEqual(expect.any(Number))
  });
});

async function actionInBinance(callback) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.binance.com/uk-UA/price/bitcoin");

  const result = await callback(page);

  await browser.close();

  return result;
}

async function getCryptocurrency(page) {
  return await page.evaluate(() => {
    return document.querySelector(".css-1iveb5f").textContent;
  });
}

async function getCurrency(page) {
  return await page.evaluate(() => {
    return document.querySelector(".bn-sdd-input.css-rivkf9").value.slice(0, 3);
  });
}

async function getPrice(page) {
  return await page.evaluate(() => {
    const result = document.querySelector(".css-12ujz79").textContent.slice(2);
    return parseInt(result)
  });
}
