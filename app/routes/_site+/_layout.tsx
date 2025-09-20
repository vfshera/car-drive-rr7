import type { Route } from "./+types/_layout";
import { Outlet } from "react-router";
import Navbar from "~/components/Navbar";
import { APP_DESCRIPTION, APP_NAME } from "~/constants";

export function meta() {
  return [{ title: APP_NAME }, { name: "description", content: APP_DESCRIPTION }];
}

export default function FrontLayout({ matches }: Route.ComponentProps) {
  const { user } = matches[0].loaderData;

  return (
    <div className="app-wrapper">
      <Navbar user={user} />
      <Outlet />
    </div>
  );
}
