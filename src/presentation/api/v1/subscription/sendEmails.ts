import { Router } from "express";
import * as controller from "../../../controllers/subscription";
const sendEmails = Router();

sendEmails.post("/", controller.sendEmails);

export default sendEmails;
