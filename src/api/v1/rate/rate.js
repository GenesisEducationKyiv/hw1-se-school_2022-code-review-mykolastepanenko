import { Router } from "express";
import * as controller from "../../../controllers/rate.js";

const rate = Router();

rate.get("/", controller.getRate);

export default rate;
