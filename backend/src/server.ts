import { app } from "./app.js";
import { env } from "./config/env.js";
import { ensureDatabaseSchema } from "./db/bootstrap.js";

const hasCode = (error: unknown): error is { code: string } =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  typeof (error as { code?: unknown }).code === "string";

function logStartupError(error: unknown) {
  if (hasCode(error) && error.code === "ECONNREFUSED") {
    console.error(
      "Database connection was refused. Check backend/.env -> DATABASE_URL."
    );
    console.error(
      "If you are using Neon, DATABASE_URL must be the Neon connection string, not localhost:5432."
    );
    console.error(
      "If you are using local PostgreSQL, make sure the PostgreSQL service is running on port 5432."
    );
  }

  console.error("Failed to start backend:", error);
}

async function startServer() {
  await ensureDatabaseSchema();

  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
}

startServer().catch((error) => {
  logStartupError(error);
  process.exit(1);
});
