import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/.server/db/schema/index.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL || "file:sqlite.db",
  },
});
