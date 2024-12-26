import users from "./schema/users.table";
import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";

export function timestampColumns() {
  return {
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`)
      .$onUpdateFn(() => sql`(unixepoch())`),
  };
}

export function userIdColumn() {
  return {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
  };
}
