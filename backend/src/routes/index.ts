import { Router } from "express";
import { z } from "zod";
import { membersRoutes } from "../modules/members/members.routes.js";
import { eventsRoutes } from "../modules/events/events.routes.js";
import { galleryRoutes } from "../modules/gallery/gallery.routes.js";
import { siteRoutes } from "../modules/site/site.routes.js";
import { adminRoutes } from "../modules/admin/admin.routes.js";
import { requireSession, AuthenticatedRequest } from "../middleware/require-session.js";
import { errorResponse, successResponse } from "../utils/api-response.js";
import { uploadImageFile, uploadImageMiddleware } from "../modules/uploads/uploads.service.js";

const uploadFolderSchema = z.enum(["members", "events", "gallery", "site"]);

const router = Router();

router.post(
  "/uploads/image",
  requireSession,
  uploadImageMiddleware.single("image"),
  async (req, res, next) => {
    try {
      const authenticatedRequest = req as AuthenticatedRequest;
      const folder = uploadFolderSchema.parse(req.body.folder);

      if (!req.file) {
        res.status(400).json(errorResponse("Image file is required."));
        return;
      }

      const adminOnlyFolders = new Set(["events", "gallery", "site"]);
      if (
        adminOnlyFolders.has(folder) &&
        authenticatedRequest.auth.user.role !== "admin"
      ) {
        res.status(403).json(errorResponse("Admin access required."));
        return;
      }

      const upload = await uploadImageFile(req.file, folder);
      res.status(201).json(successResponse("Image uploaded successfully.", upload));
    } catch (error) {
      next(error);
    }
  }
);

router.use("/members", membersRoutes);
router.use("/events", eventsRoutes);
router.use("/gallery", galleryRoutes);
router.use("/site", siteRoutes);
router.use("/admin", adminRoutes);

export default router;
