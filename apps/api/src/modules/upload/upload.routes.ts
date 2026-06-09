import { Router } from "express";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { uploadController } from "./upload.controller.js";

export const uploadRoutes = Router();

uploadRoutes.post("/signature", isAuthenticated, uploadController.getSignature);
