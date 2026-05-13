import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/api-response.js";
import { adminService } from "./admin.service.js";

export const adminController = {
  async getDashboardSummary(_req: Request, res: Response, next: NextFunction) {
    try {
      const summary = await adminService.getDashboardSummary();
      res.json(successResponse("Admin summary fetched successfully.", summary));
    } catch (error) {
      next(error);
    }
  },
};
