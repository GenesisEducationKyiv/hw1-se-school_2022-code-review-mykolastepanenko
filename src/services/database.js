import { EOL } from "os";
import readline from "readline";
import fs from "fs";
import { ALLOW_APPENDING_FLAG } from "../config/consts.js";
import { DB_FILE } from "../config/config.js";

const fileUrl = `./src/database/${DB_FILE}`;

export async function writeEmail(email) {
  const isExistsEmail = await actionInReadStream(
    FILE_URL,
    isEmailExists,
    email
  );
  if (isExistsEmail) return false;

  await actionInWriteStream(FILE_URL, writeEmailToFile, email);

  return true;
}

export async function getEmails() {
  const emails = await actionInReadStream(FILE_URL, getEmailsCallback);

  return emails;
}

async function actionInReadStream(file = FILE_URL, callback, ...args) {
  const input = fs.createReadStream(FILE_URL, "utf-8");
  const lines = readline.createInterface({ input: input, crlfDelay: Infinity });

  const result = await callback(lines, ...args);

  input.close();

  if (result) return result;
}

async function actionInWriteStream(file = FILE_URL, callback, ...args) {
  const output = fs.createWriteStream(FILE_URL, {
    flags: ALLOW_APPENDING_FLAG,
  });

  await callback(output, ...args);

  output.end();
}

async function isEmailExists(lines, email) {
  for await (const line of lines) {
    if (line === email) {
      return true;
    }
  }
}

async function writeEmailToFile(output, email) {
  const stats = await fs.promises.stat(FILE_URL);
  const size = stats.size;

  if (size === 0) {
    output.write(email);
  } else {
    output.write(EOL + email);
  }
}

async function getEmailsCallback(lines){
  const emails = [];

  for await (const email of lines) {
    emails.push(email);
  }

  return emails;
}