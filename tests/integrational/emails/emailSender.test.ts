import { testSendingEmail } from "./mocks";

describe("Testing email service", () => {
  test("Test of send emails", async () => {
    await testSendingEmail();
  });
});
