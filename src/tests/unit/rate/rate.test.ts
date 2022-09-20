import { checkTypeOfMailerInstance, removeFiles } from "./mocks";

describe("Test of rate function", () => {
  afterAll(removeFiles)
  test("Check type of mailer instance", checkTypeOfMailerInstance);
});
