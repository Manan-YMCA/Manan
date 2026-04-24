import { successResponse } from "../../utils/api-response.js";
import { galleryPayloadSchema } from "./gallery.validation.js";
import { galleryService } from "./gallery.service.js";
export const galleryController = {
    async listGallery(_req, res, next) {
        try {
            const galleryItems = await galleryService.listGallery();
            res.json(successResponse("Gallery fetched successfully.", galleryItems));
        }
        catch (error) {
            next(error);
        }
    },
    async createGalleryItem(req, res, next) {
        try {
            const payload = galleryPayloadSchema.parse(req.body);
            const createdGalleryItem = await galleryService.createGalleryItem(payload);
            res
                .status(201)
                .json(successResponse("Gallery item created successfully.", createdGalleryItem));
        }
        catch (error) {
            next(error);
        }
    },
};
