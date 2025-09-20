import seedCars from "./cars.seed";
import seedChats from "./chats.seed";
import seedUsers from "./users.seed";

async function startSeeding() {
  await seedUsers();
  await seedCars();
  await seedChats();
}

startSeeding();
