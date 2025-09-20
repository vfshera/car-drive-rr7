import type { Route } from "./+types/index";
import { loadCars } from "~/.server/db/queries/cars.queries";
import { Listing } from "~/components/Listing";
import { getHomeImage } from "~/data/cars/images";

export async function loader(args: Route.LoaderArgs) {
  const carResults = await loadCars();

  const bgImage = getHomeImage();

  return { bgImage, carResults };
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

      <Listing fullMode={false} carResults={carResults} />
    </div>
  );
}
