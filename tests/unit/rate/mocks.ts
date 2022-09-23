import fs from "fs/promises"
import { config, RATE_LOG_FILE } from "../../../src/logic/config/config";

export async function checkTypeOfMailerInstance() {
  const { mailConfig } = await config;
  expect(typeof mailConfig).toBe("object");
  expect(typeof mailConfig.host).toEqual("string");
  expect(typeof mailConfig.port).toEqual("number");
  expect(typeof mailConfig.secure).toEqual("boolean");
  expect(typeof mailConfig.auth).toEqual("object");
}

export async function removeFiles(): Promise<void> {
  try {
    await fs.rm(`./src/data/logs/${RATE_LOG_FILE}`);
  } catch (err: any) {
    throw new Error(err);
  }
}
