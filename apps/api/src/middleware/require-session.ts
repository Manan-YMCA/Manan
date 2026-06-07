import { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../auth/auth.js";
import { errorResponse } from "../utils/api-response.js";

export type AuthSession = NonNullable<
  Awaited<ReturnType<typeof auth.api.getSession>>
>;

export type AuthenticatedRequest = Request & {
  auth: AuthSession;
};

declare global {
  namespace Express {
    interface Request {
      auth?: AuthSession;
    }
  }
}

export const requireSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      return res.status(401).json(errorResponse("Unauthorized"));
    }

    req.auth = session;
    next();
  } catch (error) {
    return res.status(401).json(errorResponse("Unauthorized"));
  }
};
