import { Router } from "express";
import rate from "../../api/v1/rate/rate.js";
import subscribe from "../../api/v1/subscription/subscribe.js";
import sendEmails from "../../api/v1/subscription/sendEmails.js";

const router = Router();

router.use("/rate", rate);
router.use("/subscribe", subscribe);
router.use("/sendEmails", sendEmails);

export default router;
