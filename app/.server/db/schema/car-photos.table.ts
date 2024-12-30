import type { WithOmit } from "../types";
import { primaryKeyAutoIncrementIDColumn, timestampColumns } from "../utils";
import cars from "./cars.table";
import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

const carPhotos = sqliteTable("car_photos", {
  ...primaryKeyAutoIncrementIDColumn(),
  url: text("url").notNull(),
  carId: text("car_id")
    .notNull()
    .references(() => cars.id),
  ...timestampColumns(),
});

export const carPhotosRelations = relations(carPhotos, ({ one }) => ({
  car: one(cars, { fields: [carPhotos.carId], references: [cars.id] }),
}));

export type SelectCarPhoto = typeof carPhotos.$inferSelect;

export type InsertCarPhoto = WithOmit<typeof carPhotos.$inferInsert>;

export default carPhotos;
