import { Router } from "express";
import * as controller from "../../../controllers/subscription.js";
const sendEmails = Router();

sendEmails.post("/", (req, res) => {
  controller.sendEmails(req, res);
});

export default sendEmails;
