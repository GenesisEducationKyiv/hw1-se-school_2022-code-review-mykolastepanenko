import { EOL } from "os";
import readline from "readline";
import fs from "fs";

const fileUrl = "./src/database/emails.txt";

// функція записує унікальні email у файл
export async function writeEmail(email) {
  const input = fs.createReadStream(fileUrl, "utf-8");
  const lines = readline.createInterface({ input: input, crlfDelay: Infinity });

  let isExistsEmail = await isEmailExists(lines, email);

  // потік читання більше не використовується
  // отже закриємо його
  input.close();

  // записати тiльки не iснуючий email
  if (!isExistsEmail) {
    const output = fs.createWriteStream(fileUrl, { flags: "a" }); //флаг а для дозапису у файл
    const stats = await fs.promises.stat(fileUrl);
    const size = stats.size;

    /* перевірка розміру файлу
       щоб після запису першого email
       не створювався порожній рядок */

    if (size === 0) {
      // запис першого email
      output.write(email);
    } else {
      // запис email у файл з роздільником EOL
      output.write(EOL + email);
    }
    output.end();
    // повертати true у випадку збереження email у файл
    return true;
  }

  // повертати false у випадку iснування такого email у файлi
  return false;
}

// функція читає файл з email
// та повертає їх у вигляді масиву
export async function getEmails() {
  let emails = [];
  const input = fs.createReadStream(fileUrl, "utf-8");

  const lines = readline.createInterface({ input: input, crlfDelay: Infinity });

  for await (const email of lines) {
    emails.push(email);
  }

  return emails;
}

async function isEmailExists(lines, email){
  for await (const line of lines) {
    if (line === email) {
      return true;
    }
  }
}