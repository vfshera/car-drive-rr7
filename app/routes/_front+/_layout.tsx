import type { Route } from "./+types/_layout";
import { Outlet } from "react-router";
import { getAuthSession } from "~/.server/auth/utils";
import Navbar from "~/components/Navbar";
import { APP_DESCRIPTION, APP_NAME } from "~/constants";

export function meta() {
  return [{ title: APP_NAME }, { name: "description", content: APP_DESCRIPTION }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getAuthSession(request);

  return { user: session?.user };
}

export default function FrontLayout({ loaderData: { user } }: Route.ComponentProps) {
  return (
    <div className="app-wrapper">
      <Navbar user={user} />
      <Outlet />
    </div>
  );
}
