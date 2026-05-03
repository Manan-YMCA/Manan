import { app } from "./app.js";
import { env } from "./config/env.js";
import { ensureDatabaseSchema } from "./db/bootstrap.js";

async function startServer() {
  await ensureDatabaseSchema();

  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start backend:", error);
  process.exit(1);
});
