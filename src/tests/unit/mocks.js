import fs from "fs/promises";
import { DB_FILE } from "../../config/consts";

export async function createTestTxtFile() {
  try {
    await fs.open(`./src/database/${DB_FILE}`, "w");
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteTestTxtFile() {
  try {
    await fs.rm(`./src/database/${DB_FILE}`);
  } catch (err) {
    throw new Error(err);
  }
}
