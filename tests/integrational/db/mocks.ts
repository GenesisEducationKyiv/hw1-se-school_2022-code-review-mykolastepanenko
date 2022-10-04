import fs from "fs/promises";
import { DB_FILE } from "../../../src/logic/config/config";

export async function createTestTxtFile() {
  try {
    await fs.open(`./src/data/database/${DB_FILE}`, "w");
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function deleteTestTxtFile() {
  try {
    await fs.rm(`./src/data/database/${DB_FILE}`);
  } catch (err: any) {
    throw new Error(err);
  }
}
