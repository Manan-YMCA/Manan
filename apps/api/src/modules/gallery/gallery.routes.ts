import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middlewares/auth.middleware.js";
import { galleryController } from "./gallery.controller.js";

export const galleryRoutes = Router();

galleryRoutes.get("/", galleryController.listGallery);
galleryRoutes.post(
  "/",
  isAuthenticated,
  isAdmin,
  galleryController.createGalleryItem,
);
galleryRoutes.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  galleryController.deleteGalleryItem,
);
