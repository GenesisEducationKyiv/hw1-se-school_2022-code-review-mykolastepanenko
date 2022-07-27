import { writeEmail, getEmails } from "../services/database.js";
import * as service from "../services/email.js";

export async function subscribe(req, res) {
  const email = req.body.email;

  try {
    const isSubscribed = await writeEmail(email);
    if (!isSubscribed) {
      res.status(409).send("E-mail вже є в базі даних (файловій)");
      return;
    }
    res.status(200).send("E-mail додано");
  } catch (err) {
    console.error(err);
  }
}

export async function sendEmails(req, res) {
  const emails = await getEmails();
  await service.sendEmails(emails);
  res.status(200).send("E-mail'и відправлено");
}
