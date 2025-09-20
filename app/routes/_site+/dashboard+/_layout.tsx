import type { Route } from "./+types/_layout";
import { Outlet, useNavigate } from "react-router";
import { authClient } from "~/lib/auth.client";
import { SIGNOUT_REDIRECT } from "~/constants";

export default function DashboardLayout(props: Route.ComponentProps) {
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
