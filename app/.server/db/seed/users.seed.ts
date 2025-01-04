import { auth } from "~/.server/auth";
import { APIError } from "better-auth/api";
import kleur from "kleur";

export default async function seedUsers() {
  try {
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

    console.log(kleur.green("🌱 User seeded successfully!"));
  } catch (error) {
    if (error instanceof APIError) {
      console.error(
        kleur.red(`🚨 Error seeding user: '${error.message}'\nStatus: '${error.status}'`),
      );

      return;
    }

    console.error(kleur.red(`🚨 Error seeding user: ${(error as { message?: string })?.message}`));
  }
}
