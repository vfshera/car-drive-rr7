import type { WithOmit } from "../types";
import { timestampColumns } from "../utils";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const verifications = sqliteTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  ...timestampColumns(),
});

export type SelectVerification = typeof verifications.$inferSelect;

export type InsertVerification = WithOmit<typeof verifications.$inferInsert>;

export default verifications;
