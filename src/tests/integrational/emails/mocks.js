import nodemailer from "nodemailer";
import { config } from "../../../config/config.js";

export async function testSendingEmail() {
  const { mailConfig } = await config;

  const transporter = nodemailer.createTransport(mailConfig);

  try {
    const res = await transporter.sendMail({
      from: mailConfig.user,
      to: "example@mail.test",
      subject: "test subject",
      html: `test mail`,
    });
    expect(res.accepted.length > 0).toBe(true);
  } catch (err) {
    throw new Error(err);
  }
}
