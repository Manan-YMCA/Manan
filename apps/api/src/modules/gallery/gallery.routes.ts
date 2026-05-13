import { Router } from "express";
import { requireAdmin } from "../../middleware/require-admin.js";
import { requireSession } from "../../middleware/require-session.js";
import { galleryController } from "./gallery.controller.js";

export const galleryRoutes = Router();

galleryRoutes.get("/", galleryController.listGallery);
galleryRoutes.post("/", requireSession, requireAdmin, galleryController.createGalleryItem);
