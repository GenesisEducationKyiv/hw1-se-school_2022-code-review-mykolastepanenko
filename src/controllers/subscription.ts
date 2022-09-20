import { FileDBRepository } from "../services/database";
import * as service from "../services/email";

const db = new FileDBRepository();

export async function subscribe(req, res) {
  const email = req.body.email;

  try {
    const isSubscribed = await db.save(email);
    if (!isSubscribed) {
      res.status(409).json("E-mail вже є в базі даних (файловій)");
      return;
    }
    res.status(200).json("E-mail додано");
  } catch (err: any) {
    console.error(err);
  }
}

export async function sendEmails(req, res) {
  const emails = await db.getAll();
  const result = await service.sendEmails(emails);
  if (result.ok) {
    res.status(200).json("E-mail'и відправлено");
  } else {
    console.error("ERROR:", result?.error);
    res.status(400).json("Invalid status value");
  }
}
