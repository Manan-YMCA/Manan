import cookieParser from "cookie-parser";
import express from "express";
import { authHandler } from "./auth/auth-handler.js";
import { corsMiddleware } from "./config/cors.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler.js";

export const app = express();

app.use(corsMiddleware);
app.use(cookieParser());
app.all("/api/auth/*splat", authHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  res.json({ success: true, message: "Backend is healthy." });
});

app.use("/api", routes);
app.use(errorHandler);
