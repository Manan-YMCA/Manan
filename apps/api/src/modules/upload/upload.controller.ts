import crypto from "crypto";
import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiResponse from "../../utils/api-response.js";
import { catchAsync } from "../../utils/catch-async.js";
import { env } from "../../config/env.js";

export const uploadController = {
  getSignature: catchAsync(async (req: Request, res: Response) => {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = (req.body.folder as string) || "manan";

    const params: Record<string, string> = {
      folder,
      timestamp: String(timestamp),
    };

    const signatureString =
      Object.entries(params)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}=${v}`)
        .join("&") + env.CLOUDINARY_API_SECRET;

    const signature = crypto.createHash("sha256").update(signatureString).digest("hex");

    res.status(httpStatus.OK).json(
      new ApiResponse(httpStatus.OK, {
        signature,
        timestamp,
        cloudName: env.CLOUDINARY_CLOUD_NAME,
        apiKey: env.CLOUDINARY_API_KEY,
        folder,
      }),
    );
  }),
};
