import type { WithOmit } from "../types";
import { primaryKeyAutoIncrementIDColumn, timestampColumns } from "../utils";
import threads from "./threads.table";
import users from "./users.table";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const messages = sqliteTable("messages", {
  ...primaryKeyAutoIncrementIDColumn(),
  threadId: integer("thread_id")
    .notNull()
    .references(() => threads.id, { onDelete: "cascade" }),
  senderId: text("sender_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  isRead: integer("is_read").default(0),
  readAt: integer("read_at", { mode: "timestamp" }),
  ...timestampColumns(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  thread: one(threads, { fields: [messages.threadId], references: [threads.id] }),
  sender: one(users, { fields: [messages.senderId], references: [users.id] }),
}));

export type SelectMessage = typeof messages.$inferSelect;

export type InsertMessage = WithOmit<typeof messages.$inferInsert, "isRead" | "readAt">;

export default messages;
