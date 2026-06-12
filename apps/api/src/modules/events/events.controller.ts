import { Request, Response } from "express";
import httpStatus from "http-status";
import ApiResponse from "../../utils/api-response.js";
import ApiError from "../../utils/api-error.js";
import { catchAsync } from "../../utils/catch-async.js";
import { eventParamSchema, eventQuerySchema } from "./events.validation.js";
import { eventsService } from "./events.service.js";
import { eventPayloadSchema } from "@manan/validations";

export const eventsController = {
  listEvents: catchAsync(async (req: Request, res: Response) => {
    const { page, limit } = eventQuerySchema.parse(req.query);

    const result = await eventsService.listEvents(page, limit);

    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(httpStatus.OK, result, "Events fetched successfully."),
      );
  }),

  getEvent: catchAsync(async (req: Request, res: Response) => {
    const { id } = eventParamSchema.parse(req.params);

    const event = await eventsService.getEvent(id);
    if (!event) {
      throw new ApiError(httpStatus.NOT_FOUND, "Event not found.");
    }

    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(httpStatus.OK, event, "Event fetched successfully."),
      );
  }),

  updateEvent: catchAsync(async (req: Request, res: Response) => {
    const { id } = eventParamSchema.parse(req.params);
    const {
      name,
      venue,
      description,
      fromDate,
      toDate,
      imageUrl,
      activityReportUrl,
      eventReportUrl,
    } = eventPayloadSchema.parse(req.body);

    const updated = await eventsService.updateEvent(id, {
      name,
      venue,
      description,
      fromDate,
      toDate,
      imageUrl,
      activityReportUrl,
      eventReportUrl,
    });
    if (!updated) {
      throw new ApiError(httpStatus.NOT_FOUND, "Event not found.");
    }

    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(httpStatus.OK, updated, "Event updated successfully."),
      );
  }),

  createEvent: catchAsync(async (req: Request, res: Response) => {
    const {
      name,
      venue,
      description,
      fromDate,
      toDate,
      imageUrl,
      activityReportUrl,
      eventReportUrl,
    } = eventPayloadSchema.parse(req.body);

    const createdEvent = await eventsService.createEvent({
      name,
      venue,
      description,
      fromDate,
      toDate,
      imageUrl,
      activityReportUrl,
      eventReportUrl,
    });

    res
      .status(httpStatus.CREATED)
      .json(
        new ApiResponse(
          httpStatus.CREATED,
          createdEvent,
          "Event created successfully.",
        ),
      );
  }),

  deleteEvent: catchAsync(async (req: Request, res: Response) => {
    const { id } = eventParamSchema.parse(req.params);

    const deleted = await eventsService.deleteEvent(id);
    if (!deleted) {
      throw new ApiError(httpStatus.NOT_FOUND, "Event not found.");
    }

    res
      .status(httpStatus.OK)
      .json(
        new ApiResponse(httpStatus.OK, deleted, "Event deleted successfully."),
      );
  }),
};
