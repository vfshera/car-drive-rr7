import type { WithOmit } from "../types";
import { primaryKeyAutoIncrementIDColumn, timestampColumns } from "../utils";
import messages from "./messages.table";
import users from "./users.table";
import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

const threads = sqliteTable("threads", {
  ...primaryKeyAutoIncrementIDColumn(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  participantId: text("participant_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  ...timestampColumns(),
});

export const threadsRelations = relations(threads, ({ one, many }) => ({
  creator: one(users, {
    fields: [threads.createdBy],
    references: [users.id],
    relationName: "creator",
  }),
  participant: one(users, {
    fields: [threads.participantId],
    references: [users.id],
    relationName: "participant",
  }),
  messages: many(messages),
}));

export type SelectThread = typeof threads.$inferSelect;

export type InsertThread = WithOmit<typeof threads.$inferInsert>;

export default threads;
