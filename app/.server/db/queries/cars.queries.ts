import { db } from "..";
import cars from "../schema/cars.table";
import { eq } from "drizzle-orm";

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
