import { Router } from "express";
import { requireAdmin } from "../../middleware/require-admin.js";
import { requireSession } from "../../middleware/require-session.js";
import { eventsController } from "./events.controller.js";

export const eventsRoutes = Router();

eventsRoutes.get("/", eventsController.listEvents);
eventsRoutes.post("/", requireSession, requireAdmin, eventsController.createEvent);
