import { Router } from "express";
import { requireAdmin } from "../../middleware/require-admin.js";
import { requireSession } from "../../middleware/require-session.js";
import { adminController } from "./admin.controller.js";
export const adminRoutes = Router();
adminRoutes.get("/summary", requireSession, requireAdmin, adminController.getDashboardSummary);
