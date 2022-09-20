import { EOL } from "os";
import readline from "readline";
import fs from "fs";
import { ALLOW_APPENDING_FLAG } from "../config/consts";
import { DB_FILE } from "../config/config";
import { IDBRepository } from "./repos";

class FileDBRepository implements IDBRepository {
  fileUrl = `./src/database/${DB_FILE}`;

  async save(email:string): Promise<boolean> {
    const isExistsEmail = await this._actionInReadStream(
      this.fileUrl,
      this._isEmailExists,
      email
    );
    if (isExistsEmail) return false;

    await this._actionInWriteStream(
      this.fileUrl,
      this._writeEmailToFileCallback,
      email,
      this.fileUrl
    );

    return true;
  }

  async getAll() {
    const emails = await this._actionInReadStream(
      this.fileUrl,
      this._getEmailsCallback
    );

    return emails;
  }

  async _actionInReadStream(fileUrl = this.fileUrl, callback: any, ...args: any) {
    const input = fs.createReadStream(fileUrl, "utf-8");
    const lines = readline.createInterface({
      input: input,
      crlfDelay: Infinity,
    });

    const result = await callback(lines, ...args);

    input.close();

    if (result) return result;
  }

  async _actionInWriteStream(fileUrl = this.fileUrl, callback: any, ...args: any) {
    const output = fs.createWriteStream(fileUrl, {
      flags: ALLOW_APPENDING_FLAG,
    });

    await callback(output, ...args);

    output.end();
  }

  async _isEmailExists(lines: any, email: string) {
    for await (const line of lines) {
      if (line === email) {
        return true;
      }
    }
  }

  async _writeEmailToFileCallback(output: any, email: string, fileUrl: string) {
    const stats = await fs.promises.stat(fileUrl);
    const size = stats.size;

    if (size === 0) {
      output.write(email);
    } else {
      output.write(EOL + email);
    }
  }

  async _getEmailsCallback(lines: any) {
    const emails = [];

    for await (const email of lines) {
      emails.push(email);
    }

    return emails;
  }
}

export { FileDBRepository };

// export async function writeEmail(email) {}

// export async function getEmails() {}
