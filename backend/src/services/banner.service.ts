import { EntityManager } from "typeorm";
import { BannerSchemaType } from "../schemas/banner.schema";
import { Banner } from "../entity/Banner";
import { Request } from "express";
import { AppDataSource } from "../data-source";
import { ResourceNotFoundError } from "../common/errors";
import { ParsedQs } from "qs";

class BannerService {
  async createBanner(
    payload: BannerSchemaType,
    transactionEntityManager: EntityManager
  ) {
    const bannerRepository = transactionEntityManager.getRepository(Banner);

    const res = await bannerRepository.save(payload);
    return res;
  }

  async getAllBanners(query: ParsedQs) {
    const bannerRepository = AppDataSource.getRepository(Banner);
    const page = query.page != "" ? parseInt(query.page as string) : 1;
    const limit = query.limit != "" ? parseInt(query.limit as string) : 10;
    const skip = (page - 1) * limit;

    const res = await bannerRepository
      .createQueryBuilder("banner")
      .skip(skip)
      .take(limit)
      .orderBy("banner.updatedAt", "DESC")
      .getMany();
    return res;
  }

  async getBannerById(id: string) {
    const bannerRepository = AppDataSource.getRepository(Banner);
    const res = await bannerRepository.findOneBy({ id });
    return res;
  }

  async toggleBannerVisibility(id: string) {
    const bannerRepository = AppDataSource.getRepository(Banner);
    const bannerInstance = await bannerRepository.findOneBy({ id });
    if (!bannerInstance) {
      throw new ResourceNotFoundError("Banner not found");
    }
    bannerInstance.visible = !bannerInstance.visible;
    const res = await bannerRepository.save(bannerInstance);
    return res;
  }

  async updateBannerById(
    id: string,
    payload: BannerSchemaType,
    transactionEntityManager: EntityManager
  ) {
    const bannerRepository = transactionEntityManager.getRepository(Banner);
    
    const bannerInstance = await bannerRepository.findOneBy({ id });
    if (!bannerInstance) {
      throw new ResourceNotFoundError("Banner not found");
    }
    const res = await bannerRepository.update({ id }, payload);
    return res;
  }

  async deleteBannerById(id: string) {
    const bannerRepository = AppDataSource.getRepository(Banner);

    const bannerInstance = await bannerRepository.findOneBy({ id });
    if (!bannerInstance) {
      throw new ResourceNotFoundError("Banner not found");
    }

    const res = bannerRepository.softDelete({ id });
    return res;
  }
}

export default BannerService;
