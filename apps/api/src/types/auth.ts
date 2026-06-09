import type { Request } from "express";
import type { auth } from "../auth/auth.js";

export type AuthSession = typeof auth.$Infer.Session;

export type AuthenticatedRequest = Request & {
  auth: AuthSession;
};
