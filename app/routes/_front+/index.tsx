import type { Route } from "./+types/index";
import { Link } from "react-router";
import { getAuthSession } from "~/.server/auth/utils";
import carOne from "~/assets/images/car-one.webp";
import carThree from "~/assets/images/car-three.webp";
import carTwo from "~/assets/images/car-two.webp";
import { Listing } from "~/components/Listing";

const homeImages = [carOne, carTwo, carThree];

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getAuthSession(request);

  const bgImage = homeImages[Math.floor(Math.random() * homeImages.length)];

  return { user: session?.user, bgImage };
}

export default function Home({ loaderData: { bgImage } }: Route.ComponentProps) {
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

      <Listing fullMode={false} cars={[]} />
    </div>
  );
}
