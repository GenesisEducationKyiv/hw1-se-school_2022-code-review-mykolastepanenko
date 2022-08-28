import { Router } from "express";
import * as controller from "../../../controllers/rate.js";

const rate = Router();

rate.get("/", (req, res) => {
  controller.getRate(req, res);
});

export default rate;
