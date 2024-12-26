import type { WithOmit } from "../types";
import { timestampColumns } from "../utils";
import accounts from "./accounts.table";
import cars from "./cars.table";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  ...timestampColumns(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  cars: many(cars),
}));

export type SelectUser = typeof users.$inferSelect;

export type InsertUser = WithOmit<typeof users.$inferInsert>;

export default users;
