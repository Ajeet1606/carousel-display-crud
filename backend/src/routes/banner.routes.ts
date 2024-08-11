import { Router } from "express";
import BannerController from "../controllers/banner.controller";
import { bodySchemaValidator } from "../middlewares/schema.validator";
import { bannerSchema } from "../schemas/banner.schema";

const bannerRouter = Router();

const bannerController = new BannerController()

bannerRouter.post("/toggle-visibility/:id", bannerController.toggleBannerVisibility);
bannerRouter.post("/", bodySchemaValidator(bannerSchema), bannerController.createBanner);
bannerRouter.get("/", bannerController.getAllBanners);
bannerRouter.get("/:id", bannerController.getBannerById);
bannerRouter.put("/:id", bannerController.updateBannerById);
bannerRouter.delete("/:id", bannerController.deleteBannerById);

export default bannerRouter;