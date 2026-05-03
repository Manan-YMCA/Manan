import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { errorResponse } from "../utils/api-response.js";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json(errorResponse("Validation failed.", error.flatten()));
    return;
  }

  if (error instanceof Error) {
    console.error("Unhandled backend error:", error);
    res.status(500).json(errorResponse(error.message));
    return;
  }

  console.error("Unknown backend error:", error);
  res.status(500).json(errorResponse("Internal server error."));
};
