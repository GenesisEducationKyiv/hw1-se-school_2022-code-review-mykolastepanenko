import { writeEmail } from "../../services/database.js";

describe("Test subscribtion functions", () => {
  const email = `test${(Math.random() * 100).toString().slice(0, 3)}@test.test`;

  test("Test of writing new email to file", async () => {
    expect(await writeEmail(email)).toBe(true);
  });
  test("Test of decline existing email", async () => {
    expect(await writeEmail(email)).toBe(false);
  });
});
