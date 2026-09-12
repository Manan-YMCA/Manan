import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middlewares/auth.middleware.js";
import { rateLimiter } from "../../middlewares/rate-limiter.js";
import { adminController } from "./admin.controller.js";

export const adminRoutes = Router();

adminRoutes.get(
  "/summary",
  isAuthenticated,
  isAdmin,
  adminController.getDashboardSummary,
);
adminRoutes.get("/members/public", adminController.listPublicMembers);
adminRoutes.get(
  "/members",
  isAuthenticated,
  isAdmin,
  adminController.listMembers,
);
adminRoutes.patch(
  "/members/:id/email",
  isAuthenticated,
  isAdmin,
  adminController.updateMemberEmail,
);
adminRoutes.get(
  "/members/:id/private-details",
  rateLimiter,
  isAuthenticated,
  adminController.getMemberPrivateDetails,
);
