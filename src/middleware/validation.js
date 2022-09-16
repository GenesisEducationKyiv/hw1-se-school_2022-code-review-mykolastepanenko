import { EMAIL_REGEXP } from "../config/consts.js";

export function checkEmail(req, res, next) {
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
