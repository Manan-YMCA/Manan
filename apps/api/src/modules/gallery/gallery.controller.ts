import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiResponse from "../../utils/api-response.js";
import ApiError from "../../utils/api-error.js";
import { catchAsync } from "../../utils/catch-async.js";
import {
  galleryDeleteSchema,
  galleryQuerySchema,
} from "./gallery.validation.js";
import { galleryService } from "./gallery.service.js";
import { galleryPayloadSchema } from "@manan/validations";

export const galleryController = {
  listGallery: catchAsync(async (req: Request, res: Response) => {
    const { page, limit } = galleryQuerySchema.parse(req.query);

    const result = await galleryService.listGallery(page, limit);

    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(httpStatus.OK, result, "Gallery fetched successfully."),
      );
  }),

  createGalleryItem: catchAsync(async (req: Request, res: Response) => {
    const { name, description, imageUrl } = galleryPayloadSchema.parse(
      req.body,
    );

    const createdGalleryItem = await galleryService.createGalleryItem({
      name,
      description,
      imageUrl,
    });

    res
      .status(httpStatus.CREATED)
      .json(
        new ApiResponse(
          httpStatus.CREATED,
          createdGalleryItem,
          "Gallery item created successfully.",
        ),
      );
  }),

  deleteGalleryItem: catchAsync(async (req: Request, res: Response) => {
    const { id } = galleryDeleteSchema.parse(req.params);

    const deleted = await galleryService.deleteGalleryItem(id);
    if (!deleted) {
      throw new ApiError(httpStatus.NOT_FOUND, "Gallery item not found.");
    }

    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(
          httpStatus.OK,
          deleted,
          "Gallery item deleted successfully.",
        ),
      );
  }),
};
