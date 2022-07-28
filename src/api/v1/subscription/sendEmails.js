import { Router } from "express";
import { checkHeader } from "../../../middleware/validation.js";
import * as controller from "../../../controllers/subscription.js";
const sendEmails = Router();

sendEmails.post("/", checkHeader, (req, res) => {
  controller.sendEmails(req, res);
});

export default sendEmails;
