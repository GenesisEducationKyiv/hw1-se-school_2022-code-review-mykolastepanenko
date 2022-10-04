import * as prodConfig from "./prod.config.js";
import * as devConfig from "./dev.config.js";
import * as testConfig from "./test.config.js";

async function getConfig() {
  let config = {};

  switch (process.env.NODE_ENV) {
    case "production":
      config = prodConfig.init();
      break;
    case "development":
      config = devConfig.init();
      break;
    case "test":
      config = await testConfig.init();
      break;
    default:
      throw new Error("ENV MODE NOT SPECIFIED");
  }
  return {
    ...config,
    port: process.env.PORT || 3000,
  };
}

const config = getConfig();

export const CURRENCY = process.env.CURRENCY;
export const DB_FILE = process.env.DB_FILE;
export const RATE_LOG_FILE = process.env.RATE_LOG_FILE
export const CRYPTO_CURRENCY_PROVIDER = process.env.CRYPTO_CURRENCY_PROVIDER;
export { config };
