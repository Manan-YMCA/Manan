import { Router } from "express";
import { requireSession } from "../../middleware/require-session.js";
import { membersController } from "./members.controller.js";

export const membersRoutes = Router();

membersRoutes.get("/", membersController.listMembers);
membersRoutes.get("/me", requireSession, membersController.getMyProfile);
membersRoutes.post("/me", requireSession, membersController.createMyProfile);
membersRoutes.put("/me", requireSession, membersController.updateMyProfile);
