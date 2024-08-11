import { Router } from "express";
import bannerRouter from "./banner.routes";

const router = Router({ mergeParams: true });

router.use("/banner", bannerRouter);
export default router;
