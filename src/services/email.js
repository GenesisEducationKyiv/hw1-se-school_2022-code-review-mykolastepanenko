import nodemailer from "nodemailer";
import { getRate } from "./rate.js";
import { mailConfig } from "../config/config.js";

export async function sendEmails(emails) {
  const { user, pass, host, port } = mailConfig;

  // отримати цiну btc
  const price = await getRate("UAH");
  if (price.name === "AxiosError") {
    return;
  }

  // iнiцiалiзацiя поштового сервiсу
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
      transporter.sendMail({
        from: user,
        to: email,
        subject: "Bitcoin price by Mykola Stepanenko",
        html: `BTC/UAH: <strong>${price}</strong>.`,
      });
    } catch (err) {
      console.log(`Помилка надсилання листа на пошту ${email}`);
      console.error(err);
    }
  }
}
