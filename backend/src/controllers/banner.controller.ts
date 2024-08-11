import { Request, RequestHandler, Response } from "express";
import BannerService from "../services/banner.service";
import { AppDataSource } from "../data-source";
import { buildResponse } from "../common/utils";
import { errorHandler } from "../common/errors";

class BannerController {
  private __bannerService: BannerService = new BannerService();

  createBanner: RequestHandler = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      const result = await AppDataSource.transaction(
        async (transactionEntityManager) => {
          return await this.__bannerService.createBanner(
            payload,
            transactionEntityManager
          );
        }
      );

      return res
        .status(201)
        .send(buildResponse(result, "Banner created successfully", null));
    } catch (error) {
      errorHandler(res, error);
    }
  };

  getAllBanners: RequestHandler = async (req: Request, res: Response) => {
    try {
      const result = await this.__bannerService.getAllBanners(req.query);
      if (result.length === 0) {
        return res
          .status(200)
          .send(buildResponse(null, "No Banners found", null));
      }
      return res
        .status(200)
        .send(buildResponse(result, "Banner fetched successfully", null));
    } catch (error) {
      errorHandler(res, error);
    }
  };

  getBannerById: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this.__bannerService.getBannerById(id);
      if (!result) {
        return res
          .status(200)
          .send(buildResponse(null, "Banner not found", null));
      }
      return res
        .status(200)
        .send(buildResponse(result, "Banner fetched successfully", null));
    } catch (error) {
      errorHandler(res, error);
    }
  };

  updateBannerById: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const payload = req.body;
      const result = await AppDataSource.transaction(
        async (transactionEntityManager) => {
          return await this.__bannerService.updateBannerById(
            id,
            payload,
            transactionEntityManager
          );
        }
      );
      if (!result) {
        return res
          .status(200)
          .send(buildResponse(null, "Banner not found", null));
      }
      return res
        .status(200)
        .send(buildResponse(result, "Banner updated successfully", null));
    } catch (error) {
      errorHandler(res, error);
    }
  };

  deleteBannerById: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await this.__bannerService.deleteBannerById(id);
      if (!result) {
        return res
          .status(200)
          .send(buildResponse(null, "Banner not found", null));
      } else {
        return res
          .status(200)
          .send(buildResponse(null, "Banner deleted successfully", null));
      }
    } catch (error) {
      errorHandler(res, error);
    }
  };
}

export default BannerController;
