import { auth } from "~/.server/auth";
import { db } from "~/.server/db";
import users from "~/.server/db/schema/users.table";
import pc from "picocolors";

export default async function seedUsers(refresh = true) {
  if (refresh) {
    await db.delete(users);
  }

  await auth.api.signUpEmail({
    body: {
      name: "Admin",
      email: "admin@cardrive.com",
      password: "1234567890",
    },
  });

  await auth.api.signUpEmail({
    body: {
      name: "Admin2",
      email: "admin2@cardrive.com",
      password: "1234567890",
    },
  });

  console.log(pc.green("🌱 User seeded successfully!"));
}
