import { Router } from "express";
import home from "./home.js";
import notFound from "./404.js";
import v1 from "./api/v1.js";

const router = Router();

router.use("/", home);
router.use("/api", v1);
router.use(notFound);

export default router;
