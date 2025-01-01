import { useState } from "react";
import { Link } from "react-router";
import type { SelectCar } from "~/.server/db/schema/cars.table";
import type { Paginated } from "~/types";
import Pagination from "./Pagination";

type ListingProps = {
  fullMode?: boolean;
  inAdmin?: boolean;
  MyCars?: boolean;
  carResults: Paginated<SelectCar>;
};

export function Listing({
  carResults,
  fullMode = true,
  inAdmin = false,
  MyCars = false,
}: ListingProps) {
  const { data: cars, pagination } = carResults;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="car-list-wrapper">
      {/* ADD CARS SECTION */}

      {MyCars && isOpen && (
        <section className="add-car-form-wrapper">{/* <AddCar setIsOpen={setIsOpen} /> */}</section>
      )}

      {/* ADD CARS SECTION END */}

      {/* DISPLAY CARS */}

      {cars?.length != 0 && !isOpen && (
        <>
          <div className="list-header car-drive-container">
            <h1>{MyCars ? "My Cars" : "Top Listings"}</h1>

            {MyCars && (
              <>
                <button
                  className="add-cars"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(true);
                  }}
                >
                  Add <i className="ti-plus"></i>
                </button>
              </>
            )}

            {!fullMode ? (
              <Link to="/listing">
                More <i className="ti-arrow-right"></i>
              </Link>
            ) : (
              //   <span>{`Page ${pagination?.meta?.current_page ?? "First"} of ${
              //     pagination?.meta?.last_page ?? "Last"
              //   }`}</span>
              <span></span>
            )}
          </div>

          {cars && (
            <section className="car-list car-drive-container">
              {cars.map((car, index) => (
                <Link
                  to={`${inAdmin ? "/dashboard/cars" : "/car"}/${car.id}`}
                  key={`${car.id}-${index}`}
                >
                  <div
                    className="car-card"
                    // style={{
                    //     // backgroundImage: bgImg,
                    //     backgroundRepeat: "no-repeat",
                    //     backgroundSize: "cover",
                    //     backgroundPosition: "center",
                    // }}
                  >
                    <div className="caption-wrapper">
                      <div className="caption">
                        <div className="title">
                          <h2>{car.make}</h2>
                        </div>
                        <div className="description">
                          <h2>{car.model}</h2>
                          <h3>{car.year}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </section>
          )}

          {fullMode && <Pagination {...pagination} />}
        </>
      )}

      {/* NO CARS */}
      {cars?.length == 0 && !inAdmin && (
        <div className="flex h-1/2vh w-full flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-brand-1">No Cars Posted Yet!</h1>
          <p className="text-lg italic text-gray-800">
            You can{" "}
            <Link to="/login" className="text-brand-2">
              Create Your Account Here
            </Link>{" "}
            and start posting instantly!
          </p>
        </div>
      )}
      {/* ADMIN NO CARS */}
      {cars?.length == 0 && inAdmin && (
        <div className="flex h-3/4vh w-full flex-col items-center justify-center">
          <p className="mb-3 text-center text-xl text-brand-1">Seems We couldn't Find Cars!</p>
          {inAdmin && (
            <button
              className="add-cars"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(true);
              }}
            >
              Add <i className="ti-plus"></i>
            </button>
          )}
        </div>
      )}
    </section>
  );
}
