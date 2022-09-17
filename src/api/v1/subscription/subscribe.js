import { Router } from "express";
import * as controller from "../../../controllers/subscription.js";

const subscribe = Router();

subscribe.post("/", controller.subscribe);

export default subscribe;
