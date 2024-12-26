import type { WithOmit } from "../types";
import { timestampColumns, userIdColumn } from "../utils";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  ...userIdColumn(),
  ...timestampColumns(),
});

export type SelectSession = typeof sessions.$inferSelect;

export type InsertSession = WithOmit<typeof sessions.$inferInsert>;

export default sessions;
