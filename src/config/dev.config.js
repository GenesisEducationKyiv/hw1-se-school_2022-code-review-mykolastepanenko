import dotenv from "dotenv";

export function init() {
  dotenv.config({ path: "./.env.dev" });
  return {
    mailConfig: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  };
}
