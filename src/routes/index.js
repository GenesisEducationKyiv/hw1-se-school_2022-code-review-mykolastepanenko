import { Router } from "express";
import home from "./home.js";
import notFound from "./404.js";
import v1 from "./api/v1.js";
import { setDefaultHeader } from "../middleware/validation.js";

const router = Router();

router.use("/", home);
router.use("/api", setDefaultHeader, v1);
router.use(notFound);

export default router;
