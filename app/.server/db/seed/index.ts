import { sqlite } from "..";
import * as schema from "../schema";
import seedCars from "./cars.seed";
import seedUsers from "./users.seed";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { reset } from "drizzle-seed";
import kleur from "kleur";

async function startSeeding() {
  const seedDB = drizzle(sqlite);

  await reset(seedDB, schema);
  console.log(kleur.green("🌱 Database reset"));
  console.log();

  await seedUsers();
  await seedCars();
}

startSeeding();
