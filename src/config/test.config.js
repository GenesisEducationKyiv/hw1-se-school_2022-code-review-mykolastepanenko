import dotenv from "dotenv";
import nodemailer from "nodemailer";

export async function init() {
  dotenv.config({ path: "./.env.test" });
  return {
    mailConfig: await getMailerInstance(),
  };
}

async function getMailerInstance() {
  try {
    const mailConfig = await createMailerInstance();
    return mailConfig;
  } catch (err) {
    throw new Error(err);
  }
}

function createMailerInstance() {
  return new Promise((resolve, reject) => {
    nodemailer.createTestAccount((err, account) => {
      if (err) reject(err);
      resolve({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  });
}
