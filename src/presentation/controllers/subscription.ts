import { Request, Response } from "express";
import { FileDBRepository } from "../../logic/services/database";
import * as service from "../../logic/services/email";
import RateService from "../../logic/services/rate";
import { DB_FILE } from "../../logic/config/config";

const db = new FileDBRepository({
  fileUrl: `./src/data/database/${DB_FILE}`
});

export async function subscribe(req: Request, res: Response) {
  const email = req.body.email;

  try {
    const isSubscribed = await db.save(email);
    if (!isSubscribed) {
      res.status(409).json("E-mail вже є в базі даних (файловій)");
      return;
    }
    res.status(200).json("E-mail додано");
  } catch (err: any) {
    res.status(500).json("Неочікувана помилка")
    throw new Error(err);
  }
}

export async function sendEmails(req: Request, res: Response) {
  const rateService = new RateService();
  const emails = await db.getAll();
  const result = await service.sendEmails(emails, rateService);
  if (result.ok) {
    res.status(200).json("E-mail'и відправлено");
  } else {
    console.error("ERROR:", result?.error);
    res.status(400).json("Invalid status value");
  }
}
