import nodemailer from "nodemailer";
import { getRate } from "./rate.js";
import { mailConfig } from "../config/config.js";
import { CURRENCY } from "../config/consts.js";

export async function sendEmails(emails) {
  const { user, pass, host, port } = mailConfig;

  const price = await getRate(CURRENCY);
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
