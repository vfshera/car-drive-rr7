import type { Route } from "./+types/car.$carId";
import { useMemo, useState } from "react";
import { Link, data, isRouteErrorResponse, useRouteError } from "react-router";
import { getCarById } from "~/.server/db/queries/cars.queries";
import { getHomeImage } from "~/data/cars";

export async function loader({ params }: Route.LoaderArgs) {
  const car = await getCarById(Number(params.carId));

  if (!car) {
    throw data("Car not found", { status: 404 });
  }

  const bgImage = getHomeImage();

  return { car, bgImage };
}

export default function Car({ loaderData: { car, bgImage } }: Route.ComponentProps) {
  const [photoIndex, setPhotoIndex] = useState(0);

  const selectedPhoto = useMemo(() => {
    if (car.photos.length) {
      return car.photos[photoIndex].url || bgImage;
    }

    return bgImage;
  }, [bgImage, car.photos, photoIndex]);

  return (
    <div className="single-car-page car-drive-container">
      <div className="single-car-wrapper">
        <div className="title">
          <Link to="/listing">Cars</Link>
          <span>|</span>
          <h2>{car.make}</h2>
          <h3>{car.model}</h3>
        </div>
        <div className="details">
          <div
            className="car-photo"
            style={{
              backgroundImage: `url(${selectedPhoto})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="description">
            <div className="information">
              <p>
                Make <span>{car.make}</span>
              </p>
              <p>
                Model <span>{car.model}</span>
              </p>
              <p>
                Year <span>{car.year}</span>
              </p>
              <p>
                Owner <span>{car?.user?.name}</span>
              </p>
            </div>

            <div className="photos">
              {car.photos.map((photo, index) => (
                <div
                  className="photo"
                  key={index}
                  onClick={() => {
                    setPhotoIndex(index);
                  }}
                  style={{
                    backgroundImage: `url(${photo.url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
