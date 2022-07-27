import { Router } from "express";
import * as controller from "../../../controllers/rate.js";
import { checkHeader } from "../../../middleware/validation.js";

const rate = Router();

rate.get("/", checkHeader, (req, res) => {
  controller.getRate(req, res);
});

export default rate;
