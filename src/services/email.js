import nodemailer from "nodemailer";
import RateService from "./rate.js";
import { config, CURRENCY} from "../config/config.js";

const { mailConfig } = config;

export async function sendEmails(emails) {
  const { user, pass, host, port } = mailConfig;
  const rateService = new RateService();

  const price = await rateService.getRate(CURRENCY);
  if (!price.ok) {
    return { ok: false, error: price.error };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: {
      user: user,
      pass: pass,
    },
  });

  // надсилання листiв
  for (const email of emails) {
    try {
      await transporter.sendMail({
        from: user,
        to: email,
        subject: "Bitcoin price by Mykola Stepanenko",
        html: `BTC/UAH: <strong>${price.value}</strong>.`,
      });
    } catch (err) {
      console.log(`Помилка надсилання листа на пошту ${email}`);
      console.error(err);
    }
  }
  return { ok: true };
}
