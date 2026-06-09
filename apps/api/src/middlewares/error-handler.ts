import type { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { logger } from "../config/logger.js";
import ApiError from "../utils/api-error.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Validation failed.",
      errors: error.flatten(),
    });
    return;
  }

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    return;
  }

  logger.error({ err: error }, "Unhandled request error");
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal server error.",
  });
};
