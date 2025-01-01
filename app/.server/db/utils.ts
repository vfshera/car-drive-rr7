import { PAGINATION_SIZE } from "~/constants/database";
import type { Paginated } from "~/types";
import users from "./schema/users.table";
import { sql } from "drizzle-orm";
import { type SQLiteSelect, integer, text } from "drizzle-orm/sqlite-core";

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

export function primaryKeyAutoIncrementIDColumn() {
  return {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  };
}

export function withPagination<T extends SQLiteSelect>(
  qb: T,
  page: number = 1,
  pageSize: number = PAGINATION_SIZE,
) {
  return qb.limit(pageSize).offset((page - 1) * pageSize);
}

export function toPaginated<Data>(
  data: Data[],
  currentPage: number,
  totalItems: number,
  perPage: number,
): Paginated<Data> {
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data,
    pagination: {
      currentPage,
      lastPage: totalPages,
      totalItems,
      perPage,
      totalPages,
      next: currentPage < totalPages ? currentPage + 1 : null,
      prev: currentPage > 1 ? currentPage - 1 : null,
    },
  };
}
