import puppeteer from "puppeteer";

export async function actionInBinance(callback) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.binance.com/uk-UA/price/bitcoin");

  const result = await callback(page);

  await browser.close();

  return result;
}

export async function getCryptocurrency(page) {
  return await page.evaluate(() => {
    return document.querySelector(".css-1iveb5f").textContent;
  });
}

export async function getCurrency(page) {
  return await page.evaluate(() => {
    return document.querySelector(".bn-sdd-input.css-rivkf9").value.slice(0, 3);
  });
}

export async function getPrice(page) {
  return await page.evaluate(() => {
    const result = document.querySelector(".css-12ujz79").textContent.slice(2);
    return parseFloat(result);
  });
}
