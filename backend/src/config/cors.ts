import cors from "cors";
import { env } from "./env.js";

export const corsMiddleware = cors({
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }

    if (env.FRONTEND_URL_LIST.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS.`));
  },
  credentials: true,
});
