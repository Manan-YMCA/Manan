import { NextFunction, Request, RequestHandler, Response } from "express";
import { AuthenticatedRequest } from "./require-session.js";
import { errorResponse } from "../utils/api-response.js";

export const requireAdmin: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authenticatedRequest = req as AuthenticatedRequest;

  if (authenticatedRequest.auth.user.role !== "admin") {
    res.status(403).json(errorResponse("Admin access required."));
    return;
  }

  next();
};
