import nodemailer from "nodemailer";

export async function testSendingEmail() {
  nodemailer.createTestAccount(async (err, account) => {
    if (err) throw new Error(err);
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    try {
      const res = await transporter.sendMail({
        from: account.user,
        to: "Nikolaua36@gmail.com",
        subject: "test subject",
        html: `test mail`,
      });
      console.log("res below");
      expect(res).toBe(false);
    } catch (err) {
      throw new Error(err);
    }
  });
}
