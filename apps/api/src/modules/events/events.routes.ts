import { Router } from "express";
import { isAdmin, isAuthenticated } from "../../middlewares/auth.middleware.js";
import { eventsController } from "./events.controller.js";

export const eventsRoutes = Router();

eventsRoutes.get("/", eventsController.listEvents);
eventsRoutes.get("/:id", eventsController.getEvent);
eventsRoutes.post("/", isAuthenticated, isAdmin, eventsController.createEvent);
eventsRoutes.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  eventsController.updateEvent,
);
eventsRoutes.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  eventsController.deleteEvent,
);
