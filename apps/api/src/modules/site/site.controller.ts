import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/api-response.js";
import { siteService } from "./site.service.js";
import { siteContentPayloadSchema } from "./site.validation.js";

export const siteController = {
  async getSiteContent(_req: Request, res: Response, next: NextFunction) {
    try {
      const content = await siteService.getSiteContent();
      res.json(successResponse("Site content fetched successfully.", content));
    } catch (error) {
      next(error);
    }
  },

  async updateSiteContent(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = siteContentPayloadSchema.parse(req.body);
      const content = await siteService.updateSiteContent(payload);
      res.json(successResponse("Site content updated successfully.", content));
    } catch (error) {
      next(error);
    }
  },
};
