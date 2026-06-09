import { Router } from "express";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { profileController } from "./profile.controller.js";

export const profileRoutes = Router();

profileRoutes.get("/", isAuthenticated, profileController.getProfile);
profileRoutes.put("/", isAuthenticated, profileController.upsertProfile);
