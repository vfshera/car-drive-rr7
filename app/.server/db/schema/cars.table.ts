import type { WithOmit } from "../types";
import { primaryKeyAutoIncrementIDColumn, timestampColumns, userIdColumn } from "../utils";
import carPhotos from "./car-photos.table";
import users from "./users.table";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const cars = sqliteTable("cars", {
  ...primaryKeyAutoIncrementIDColumn(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  showLocation: text("show_location").notNull(),
  ...userIdColumn(),
  ...timestampColumns(),
});

export const carsRelations = relations(cars, ({ one, many }) => ({
  user: one(users, { fields: [cars.userId], references: [users.id] }),
  photos: many(carPhotos),
}));

export type SelectCar = typeof cars.$inferSelect;

export type InsertCar = WithOmit<typeof cars.$inferInsert>;

export default cars;
