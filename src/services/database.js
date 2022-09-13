import { EOL } from "os";
import readline from "readline";
import fs from "fs";
import { ALLOW_APPENDING_FLAG, DB_FILE } from "../config/consts.js";

const fileUrl = `./src/database/${DB_FILE}`;

export async function writeEmail(email) {
  const input = fs.createReadStream(fileUrl, "utf-8");
  const lines = readline.createInterface({ input: input, crlfDelay: Infinity });

  let isExistsEmail = await isEmailExists(lines, email);

  input.close();

  if (isExistsEmail) return false;
  const output = fs.createWriteStream(fileUrl, {
    flags: ALLOW_APPENDING_FLAG,
  });
  const stats = await fs.promises.stat(fileUrl);
  const size = stats.size;

  if (size === 0) {
    output.write(email);
  } else {
    output.write(EOL + email);
  }
  output.end();
  return true;
}

export async function getEmails() {
  let emails = [];
  const input = fs.createReadStream(fileUrl, "utf-8");

  const lines = readline.createInterface({ input: input, crlfDelay: Infinity });

  for await (const email of lines) {
    emails.push(email);
  }

  return emails;
}

async function isEmailExists(lines, email) {
  for await (const line of lines) {
    if (line === email) {
      return true;
    }
  }
}
