import { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import httpStatus from "http-status";
import { auth } from "../auth/auth.js";
import ApiError from "../utils/api-error.js";

export const isAuthenticated = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized"));
    }

    req.auth = {
      user: session.user,
      session: session.session,
    };
    next();
  } catch (err) {
    next(err);
  }
};

export const isAdmin = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (req.auth.user.role !== "admin") {
    return next(new ApiError(httpStatus.FORBIDDEN, "Admin access required"));
  }

  next();
};
