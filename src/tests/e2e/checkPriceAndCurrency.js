import puppeteer from "puppeteer";

checkPriceAndCurrency("BTC", "USD");

async function checkPriceAndCurrency(cryptocurrency, currency) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.binance.com/uk-UA/price/bitcoin");

  const result = {
    cryptocurrency: await getCryptoCurrency(page),
    currency: await getCurrency(page),
    price: await getPrice(page),
  };

  await browser.close();

  if (
    cryptocurrency === result.cryptocurrency &&
    currency === result.currency
  ) {
    console.log("TEST: OK");
    console.log("RESULT:", result);
  } else {
    console.log("TEST: FAIL");
    console.log("EXPECTED:", { cryptocurrency, currency });
    console.log("RESULT:", result);
  }
}

async function getCryptoCurrency(page) {
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
    return document.querySelector(".css-12ujz79").textContent.slice(2);
  });
}
