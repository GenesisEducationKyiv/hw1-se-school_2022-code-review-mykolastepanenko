import { EOL } from "os";
import fs from "fs/promises";
import { ALLOW_APPENDING_FLAG } from "../config/consts";
import { RATE_LOG_FILE } from "../config/config";

export default class Logger {
  static rateLogger(data: string) {
    fs.writeFile(`./src/logs/${RATE_LOG_FILE}`, data + EOL, {
      flag: ALLOW_APPENDING_FLAG,
    });
  }
}
