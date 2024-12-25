import { getMakeModelObjects } from "~/data/cars";
import { db } from "..";
import { cars } from "../schema";
import type { InsertCar } from "../types";
import kleur from "kleur";
import { draw, random, shuffle } from "radashi";

function prepareCars(items = 10) {
  const makeWithModels = getMakeModelObjects();

  return shuffle(makeWithModels).slice(0, items);
}

function randomCoordinates() {
  const MIN = 2;

  const MAX = 28;

  return `${random(MIN, MAX).toFixed(2)},${random(MIN, MAX).toFixed(2)}`;
}

export default async function seedCars() {
  const userIds = await db.query.users.findMany({ columns: { id: true } });

  if (userIds.length === 0) {
    console.error(kleur.red("🚨 No users found to seed cars - Seed/Create a user first"));

    return;
  }

  const data: InsertCar[] = prepareCars(10).map((car) => ({
    ...car,
    year: random(1998, 2024),
    showLocation: randomCoordinates(),
    userId: draw(userIds)!.id,
  }));

  await db.insert(cars).values(data);

  console.log(kleur.green("🌱 Cars seeded successfully!"));
}
