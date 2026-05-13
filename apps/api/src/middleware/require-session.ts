import { NextFunction, Request, Response } from "express";
import { auth } from "../auth/auth.js";
import { errorResponse } from "../utils/api-response.js";

export type AuthSession = NonNullable<
  Awaited<ReturnType<typeof auth.api.getSession>>
>;

export type AuthenticatedRequest = Request & {
  auth: AuthSession;
};

const createHeaders = (req: Request) => {
  const headers = new Headers();

  Object.entries(req.headers).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      headers.set(key, value.join(","));
    } else if (value) {
      headers.set(key, value);
    }
  });

  return headers;
};

export const requireSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: createHeaders(req),
    });

    if (!session?.user || !session?.session) {
      res.status(401).json(errorResponse("Unauthorized"));
      return;
    }

    (req as AuthenticatedRequest).auth = session;
    next();
  } catch (error) {
    res.status(401).json(errorResponse("Unauthorized"));
  }
};
