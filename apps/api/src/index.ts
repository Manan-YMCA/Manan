import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"
import apirouter from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler.js";
import { env } from "./config/env.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth/auth.js";

export const app = express();

app.use(cors({
  origin: env.FRONTEND_URL,
  methods: ["POST", "GET"],
  credentials: true,
}));

app.use(cookieParser());

app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", apirouter);
app.use(errorHandler);


app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});
