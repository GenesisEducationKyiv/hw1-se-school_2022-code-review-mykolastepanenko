import nodemailer from "nodemailer";
import { getRate } from "./rate.js";
import { mailConfig } from "../config/config.js";

export async function sendEmails(emails) {
  const { user, pass } = mailConfig;
  let isError;

  const price = await getRate("UAH");
  if (price.name === "AxiosError") {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: user,
      pass: pass,
    },
  });

  for (const email of emails) {
    try {
      transporter.sendMail({
        from: user,
        to: email,
        subject: "Bitcoin price by Mykola Stepanenko",
        html: `BTC/UAH: <strong>${price}</strong>.`,
      });
    } catch (err) {
      console.error(err);
      isError = true;
    }
  }
}
