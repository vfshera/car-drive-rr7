import type { Route } from "./+types/cars";
import { requireAuth } from "~/.server/auth/utils";
import { loadMyCars } from "~/.server/db/queries/cars.queries";
import { Listing } from "~/components/Listing";
import { getMeta } from "~/utils/meta";

export function meta() {
  return [...getMeta({ title: "My Cars" })];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireAuth(request);

  const url = new URL(request.url);

  const page = Number(url.searchParams.get("page")) || 1;

  const perPage = Number(url.searchParams.get("perPage")) || undefined;

  const carResults = await loadMyCars(user.id, page, perPage);

  return { carResults };
}

export default function DashboardCars({ loaderData: { carResults } }: Route.ComponentProps) {
  return <Listing carResults={carResults} fullMode inAdmin MyCars />;
}