import type { cars } from "./schema";

export type SelectCar = typeof cars.$inferSelect;

export type InsertCar = Omit<typeof cars.$inferInsert, "id" | "createdAt" | "updatedAt">;
