import { Router } from "express";
import rate from "../../api/v1/rate/rate";
import subscribe from "../../api/v1/subscription/subscribe";
import sendEmails from "../../api/v1/subscription/sendEmails";
import { checkEmail } from "../../middleware/validation";

const router = Router();

router.use("/rate", rate);
router.use("/subscribe", checkEmail, subscribe);
router.use("/sendEmails", sendEmails);

export default router;
