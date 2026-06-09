import { Request, Response } from "express";
import httpStatus from "http-status";
import { z } from "zod";
import ApiResponse from "../../utils/api-response.js";
import ApiError from "../../utils/api-error.js";
import { catchAsync } from "../../utils/catch-async.js";
import { adminService } from "./admin.service.js";

const updateEmailSchema = z.object({ email: z.email() });

export const adminController = {
  getDashboardSummary: catchAsync(async (_req: Request, res: Response) => {
    const summary = await adminService.getDashboardSummary();
    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(
          httpStatus.OK,
          summary,
          "Admin summary fetched successfully.",
        ),
      );
  }),

  updateMemberEmail: catchAsync(async (req: Request, res: Response) => {
    const { email } = updateEmailSchema.parse(req.body);
    const updated = await adminService.updateMemberEmail(
      req.params["id"] as string,
      email,
    );
    if (!updated) {
      throw new ApiError(httpStatus.NOT_FOUND, "Member not found.");
    }
    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(httpStatus.OK, updated, "Email updated successfully."),
      );
  }),

  listPublicMembers: catchAsync(async (_req: Request, res: Response) => {
    const members = await adminService.listPublicMembers();
    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(
          httpStatus.OK,
          members,
          "Members fetched successfully.",
        ),
      );
  }),

  listMembers: catchAsync(async (req: Request, res: Response) => {
    const page = Number(req.query["page"]) || 1;
    const limit = Number(req.query["limit"]) || 10;
    const result = await adminService.listMembers(page, limit);
    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(httpStatus.OK, result, "Members fetched successfully."),
      );
  }),
};
