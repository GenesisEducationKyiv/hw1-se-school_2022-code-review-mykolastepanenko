import { Router } from "express";
import * as controller from "../../../controllers/subscription.js";
import { checkEmail } from "../../../middleware/validation.js";

const subscribe = Router();

subscribe.post("/", checkEmail, (req, res) => {
  controller.subscribe(req, res);
});

export default subscribe;
