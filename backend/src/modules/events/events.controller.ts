import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/api-response.js";
import { eventPayloadSchema } from "./events.validation.js";
import { eventsService } from "./events.service.js";

export const eventsController = {
  async listEvents(_req: Request, res: Response, next: NextFunction) {
    try {
      const events = await eventsService.listEvents();
      res.json(successResponse("Events fetched successfully.", events));
    } catch (error) {
      next(error);
    }
  },

  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = eventPayloadSchema.parse(req.body);
      const createdEvent = await eventsService.createEvent(payload);
      res.status(201).json(successResponse("Event created successfully.", createdEvent));
    } catch (error) {
      next(error);
    }
  },
};
