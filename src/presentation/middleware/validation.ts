import { NextFunction, Request, Response } from "express";
import { EMAIL_REGEXP } from "../../logic/config/consts";

export function checkEmail(req: Request, res: Response, next: NextFunction) {
  const email = req.body.email;
  if (!email) {
    res.status(400).json("Email is required");
    return;
  }

  const isValid = EMAIL_REGEXP.test(email);
  if (!isValid) {
    res.status(400).json("Incorrect email");
    return;
  }
  next();
}
