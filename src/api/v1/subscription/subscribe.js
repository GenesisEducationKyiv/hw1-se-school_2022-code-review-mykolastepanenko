import { Router } from "express";
import * as controller from "../../../controllers/subscription.js";
import { checkHeader, checkEmail } from "../../../middleware/validation.js";

const subscribe = Router();

subscribe.post("/", checkHeader, checkEmail, (req, res) => {
  controller.subscribe(req, res);
});

export default subscribe;
