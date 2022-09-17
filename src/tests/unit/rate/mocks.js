import { config } from "../../../config/config.js";

export async function checkTypeOfMailerInstance() {
  const { mailConfig } = await config;
  console.log(typeof mailConfig);
  expect(typeof mailConfig).toBe("object");
  expect(typeof mailConfig.host).toEqual("string");
  expect(typeof mailConfig.port).toEqual("number");
  expect(typeof mailConfig.secure).toEqual("boolean");
  expect(typeof mailConfig.auth).toEqual("object");
}
