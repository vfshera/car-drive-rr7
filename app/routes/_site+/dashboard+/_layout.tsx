import type { Route } from "./+types/_layout";
import { Link, Outlet, useNavigate } from "react-router";
import { requireAuth } from "~/.server/auth/utils";
import { authClient } from "~/lib/auth.client";
import { SIGNOUT_REDIRECT } from "~/constants";

export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireAuth(request);

  return { user };
}

export default function DashboardLayout({ loaderData: { user } }: Route.ComponentProps) {
  const navigate = useNavigate();

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate(SIGNOUT_REDIRECT);
        },
      },
    });
  }

  return (
    <div className="flex w-full">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
