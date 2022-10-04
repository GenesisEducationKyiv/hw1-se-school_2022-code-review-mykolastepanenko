import { EOL } from "os";
import fs from "fs/promises";
import { ALLOW_APPENDING_FLAG } from "../config/consts.js";
import { RATE_LOG_FILE } from "../config/config.js";

export default class Logger {
  static rateLogger(data) {
    fs.writeFile(`./src/logs/${RATE_LOG_FILE}`, data + EOL, {
      flag: ALLOW_APPENDING_FLAG,
    });
  }
}
