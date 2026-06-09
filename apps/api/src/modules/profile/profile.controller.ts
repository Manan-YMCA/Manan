import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiResponse from "../../utils/api-response.js";
import { catchAsync } from "../../utils/catch-async.js";
import { profileService } from "./profile.service.js";
import { profileSchema } from "@manan/validations";

export const profileController = {
  getProfile: catchAsync(async (req: Request, res: Response) => {
    const userId = req.auth!.user.id;
    const profile = await profileService.getProfile(userId);
    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(
          httpStatus.OK,
          profile,
          "Profile fetched successfully.",
        ),
      );
  }),

  upsertProfile: catchAsync(async (req: Request, res: Response) => {
    const userId = req.auth!.user.id;
    const data = profileSchema.parse(req.body);
    await profileService.upsertProfile(userId, data);
    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(httpStatus.OK, null, "Profile updated successfully."),
      );
  }),
};
