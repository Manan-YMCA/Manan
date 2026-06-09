import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { pinoHttp } from "pino-http";
import { env } from "./config/env.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/auth.js";
import { logger } from "./config/logger.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { apiRouter } from "./routes/v1/index.js";

export const app = express();

const allowedOrigins = [...new Set([env.FRONTEND_URL, ...env.TRUSTED_ORIGINS])];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(pinoHttp({ logger }));
app.use(cookieParser());

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", apiRouter);
app.use(errorHandler);

if (!process.env.VERCEL) {
  app
    .listen(env.PORT, () => {
      logger.info({ port: env.PORT, nodeEnv: env.NODE_ENV }, "Server started");
    })
    .on("error", (err) => {
      logger.error({ err }, "Failed to start server");
    });
}

export default app;
