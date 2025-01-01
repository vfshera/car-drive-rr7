import { PAGINATION_SIZE } from "~/constants/database";
import { db } from "..";
import cars from "../schema/cars.table";
import { toPaginated, withPagination } from "../utils";
import { desc, eq, sql } from "drizzle-orm";

export async function loadCars(page = 1, pageSize = PAGINATION_SIZE) {
  const query = db.select().from(cars).orderBy(desc(cars.createdAt)).$dynamic();

  const [totalCars] = await db.select({ count: sql<number>`count(*)` }).from(cars);

  const data = await withPagination(query, page, pageSize);

  return toPaginated(data, page, totalCars.count, pageSize);
}

export async function loadMyCars(userId: string, page = 1, pageSize = PAGINATION_SIZE) {
  const query = db
    .select()
    .from(cars)
    .where(eq(cars.userId, userId))
    .orderBy(desc(cars.createdAt))
    .$dynamic();

  const [totalCars] = await db.select({ count: sql<number>`count(*)` }).from(cars);

  const data = await withPagination(query, page, pageSize);

  return toPaginated(data, page, totalCars.count, pageSize);
}

/**
 * Finds a car by its ID.
 *
 * @param carId The ID of the car to search for.
 * @returns The car found, or `undefined` if no car was found.
 */
export function getCarById(carId: number) {
  return db.query.cars.findFirst({
    where: eq(cars.id, carId),
    with: {
      user: {
        columns: {
          name: true,
        },
      },
      photos: true,
    },
  });
}
