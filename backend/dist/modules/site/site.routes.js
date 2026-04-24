import { Router } from "express";
import { requireAdmin } from "../../middleware/require-admin.js";
import { requireSession } from "../../middleware/require-session.js";
import { siteController } from "./site.controller.js";
export const siteRoutes = Router();
siteRoutes.get("/", siteController.getSiteContent);
siteRoutes.put("/", requireSession, requireAdmin, siteController.updateSiteContent);
