import type { Route } from "./+types/index";
import { getAuthSession } from "~/.server/auth/utils";
import { loadCars } from "~/.server/db/queries/cars.queries";
import { Listing } from "~/components/Listing";
import { getHomeImage } from "~/data/cars";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getAuthSession(request);

  const carResults = await loadCars();

  const bgImage = getHomeImage();

  return { user: session?.user, bgImage, carResults };
}

export default function Home({ loaderData: { bgImage, carResults } }: Route.ComponentProps) {
  return (
    <div className="home-page">
      <section
        className="hero"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></section>

      <Listing fullMode={false} cars={carResults} />
    </div>
  );
}
