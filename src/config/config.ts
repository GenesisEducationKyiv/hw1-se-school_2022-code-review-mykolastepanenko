import * as prodConfig from "./prod.config";
import * as devConfig from "./dev.config";
import * as testConfig from "./test.config";

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

const config: any = getConfig();

export const CURRENCY: string = process.env.CURRENCY as string;
export const DB_FILE: string = process.env.DB_FILE as string;
export const RATE_LOG_FILE: string = process.env.RATE_LOG_FILE as string;
export const CRYPTO_CURRENCY_PROVIDER: string = process.env
  .CRYPTO_CURRENCY_PROVIDER as string;
export { config };
