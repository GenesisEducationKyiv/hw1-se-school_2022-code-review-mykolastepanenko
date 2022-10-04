import { FileDBRepository } from "../../../src/logic/services/database";
import { createTestTxtFile, deleteTestTxtFile } from "./mocks";
import { DB_FILE } from "../../../src//logic/config/config";

describe("Test of actions with db (txt file)", () => {
  const email = `test${(Math.random() * 100).toString().slice(0, 3)}@test.test`;
  const db = new FileDBRepository({
    fileUrl: `./src/data/database/${DB_FILE}`,
  });

  beforeAll(createTestTxtFile);

  afterAll(deleteTestTxtFile);

  test("Test of writing new email to file", async () => {
    expect(await db.save(email)).toBe(true);
  });
  test("Test of decline existing email", async () => {
    expect(await db.save(email)).toBe(false);
  });
});
