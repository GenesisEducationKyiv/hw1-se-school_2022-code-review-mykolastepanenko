import { testSendingEmail } from "./mocks.js";

describe("Testing email service", () => {
  test("Test of send emails", async () => {
    await testSendingEmail();
  });
});
