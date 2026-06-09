import express from "express";
import { adminRoutes } from "../../modules/admin/admin.routes.js";
import { eventsRoutes } from "../../modules/events/events.routes.js";
import { galleryRoutes } from "../../modules/gallery/gallery.routes.js";
import { profileRoutes } from "../../modules/profile/profile.routes.js";
import { uploadRoutes } from "../../modules/upload/upload.routes.js";

export const apiRouter = express.Router();

apiRouter.use("/admin", adminRoutes);
apiRouter.use("/gallery", galleryRoutes);
apiRouter.use("/events", eventsRoutes);
apiRouter.use("/profile", profileRoutes);
apiRouter.use("/upload", uploadRoutes);
